import pgPromise from 'pg-promise'

import { Assessment } from 'meta/assessment/assessment'
import { Cycle, CycleUuid } from 'meta/assessment/cycle'
import { RepositoryItemProps } from 'meta/cycleData/repository/item'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, DB } from 'server/db/db'
import { getRepositoryDDL } from 'server/db/repository/public/ddl/getCreatePublicSchemaDDL'
import { Schemas } from 'server/db/schemas'

import { tableExists } from './utils/tableExists'

const pgp = pgPromise()

type DBRepositoryItem = {
  uuid: string
  country_iso: string | null
  file_uuid: string | null
  link: string | null
  props: RepositoryItemProps
}

type DBRepositoryItemInsert = DBRepositoryItem & {
  assessmentUuid: string | null
  cycleUuid: CycleUuid | null
}

type CycleItems = {
  cycleUuid: CycleUuid
  items: Array<DBRepositoryItem>
}

type ResolveResult = {
  items: Array<DBRepositoryItemInsert>
  // Map containing [key: deleted] -> [value: replaced with]
  uuidMapping: Record<string, string>
}

const _resolveItems = (assessment: Assessment, cyclesWithItems: Array<CycleItems>): ResolveResult => {
  const acc: Record<string, DBRepositoryItemInsert> = {}
  const uuidMapping: Record<string, string> = {}
  const assessmentUuid = assessment.uuid

  // Hidden files have no assessment_uuid and cycle_uuid
  const _hiddenFile = (item: DBRepositoryItem): void => {
    if (!acc[item.uuid]) acc[item.uuid] = { ...item, assessmentUuid: null, cycleUuid: null }
  }

  // Global items have assessment_uuid and cycle_uuid.
  // Deduplicate items by: link (outside links) -> file_uuid (platform files) -> item.uuid (as fallback)

  // NOTE!!: We have duplicated/updated global items!
  const _globalItemKey = (item: DBRepositoryItem): string => item.link ?? item.file_uuid ?? item.uuid

  const _globalItem = (item: DBRepositoryItem, cycleUuid: CycleUuid): void => {
    const key = _globalItemKey(item)
    if (!acc[key]) acc[key] = { ...item, assessmentUuid, cycleUuid }
    // Keep track of deleted items
    else if (acc[key].uuid !== item.uuid) uuidMapping[item.uuid] = acc[key].uuid
  }

  // Country items have assessment_uuid, cycle_uuid and "newest/latest" props in case of duplication
  // Deduplicate by file_uuid (same file cloned across cycles)
  const _countryItemKey = (item: DBRepositoryItem): string => item.file_uuid ?? item.uuid

  const _countryItem = (item: DBRepositoryItem, cycleUuid: CycleUuid): void => {
    const key = _countryItemKey(item)
    if (acc[key]) {
      // Keep track of deleted items
      if (acc[key].uuid !== item.uuid) uuidMapping[item.uuid] = acc[key].uuid
      acc[key].props = item.props
    } else {
      acc[key] = { ...item, assessmentUuid, cycleUuid }
    }
  }

  cyclesWithItems.forEach(({ cycleUuid, items }) => {
    items.forEach((item) => {
      if (!item.country_iso && item.props?.hidden === true) _hiddenFile(item)
      else if (!item.country_iso) _globalItem(item, cycleUuid)
      else _countryItem(item, cycleUuid)
    })
  })

  return { items: Object.values(acc), uuidMapping }
}

type FixTableProps = { schema: string; uuidMapping: Record<string, string> }
type FixLinksProps = { assessment: Assessment; uuidMapping: Record<string, string> }

// Recursively concatenate all uuid replacements in a single expression to avoid multiple hits to the table
// e.g. (replace(replace(value::text, 'old-uuid-1', 'new-uuid-1'), 'old-uuid-2', 'new-uuid-2'))::jsonb
const _replaceUuid = (col: string, uuidMapping: Record<string, string>): string =>
  Object.entries(uuidMapping).reduce((acc, [oldUuid, newUuid]) => `replace(${acc}, '${oldUuid}', '${newUuid}')`, col)

const _fixDescriptions = ({ schema, uuidMapping }: FixTableProps, client: BaseProtocol): Promise<null> =>
  client.none(
    `update ${schema}.descriptions
     set value = (${_replaceUuid('value::text', uuidMapping)})::jsonb`
  )

const _fixOdp = ({ schema, uuidMapping }: FixTableProps, client: BaseProtocol): Promise<null> =>
  client.none(
    `update ${schema}.original_data_point
     set data_source_references = ${_replaceUuid('data_source_references', uuidMapping)},
         comments_extentofforest = ${_replaceUuid('comments_extentofforest', uuidMapping)},
         comments_forestcharacteristics = ${_replaceUuid('comments_forestcharacteristics', uuidMapping)}`
  )

// Fix links: replace old deleted uuids with their replacements in one query per table per schema
const _fixLinks = async ({ assessment, uuidMapping }: FixLinksProps, client: BaseProtocol): Promise<void> => {
  if (Object.keys(uuidMapping).length === 0) return

  await Promise.all(
    assessment.cycles.map(async (cycle) => {
      const schema = Schemas.getNameCycle(assessment, cycle)
      const props = { schema, uuidMapping }
      await Promise.all([_fixDescriptions(props, client), _fixOdp(props, client)])
    })
  )
}

// get repository items from given schema
const _getItems = (schema: string, client: BaseProtocol): Promise<Array<DBRepositoryItem>> => {
  return client.any<DBRepositoryItem>(`select uuid, country_iso, file_uuid, link, props from ${schema}.repository`)
}

// returns repository items with cycleUuid
const _migrateCycle =
  (assessment: Assessment, client: BaseProtocol) =>
  async (cycle: Cycle): Promise<CycleItems> => {
    const schema = Schemas.getNameCycle(assessment, cycle)
    const cycleUuid = cycle.uuid

    const { exists } = await tableExists({ schema, tableName: 'repository' }, client)
    if (!exists) return { cycleUuid, items: [] }

    const items = await _getItems(schema, client)
    return { cycleUuid, items }
  }

const _insertItems = async (items: Array<DBRepositoryItemInsert>, client: BaseProtocol): Promise<void> => {
  if (items.length === 0) return

  const cs = new pgp.helpers.ColumnSet(
    [
      'uuid',
      { name: 'assessment_uuid', prop: 'assessmentUuid' },
      { name: 'cycle_uuid', prop: 'cycleUuid' },
      'country_iso',
      'file_uuid',
      'link',
      { name: 'props', cast: 'jsonb' },
    ],
    { table: { table: 'repository', schema: 'public' } }
  )

  const query = `${pgp.helpers.insert(items, cs)} on conflict (uuid) do nothing`
  await client.none(query)
}

const _migrateAssessment =
  (client: BaseProtocol) =>
  async (assessment: Assessment): Promise<void> => {
    const cycles = [...assessment.cycles].sort((a, b) => a.id - b.id)
    const cyclesWithItems = await Promise.all(cycles.map(_migrateCycle(assessment, client)))
    const { items, uuidMapping } = _resolveItems(assessment, cyclesWithItems)

    // -- insert items to db
    await _insertItems(items, client)
    // -- fix broken links in db
    await _fixLinks({ assessment, uuidMapping }, client)
  }

const _archiveCycleTable =
  (assessment: Assessment) =>
  async (cycle: Cycle): Promise<void> => {
    const schema = Schemas.getNameCycle(assessment, cycle)
    const archiveName = `${schema}_repository`

    const { exists: legacyExists } = await tableExists({ schema: '_legacy', tableName: archiveName }, DB)
    if (legacyExists) return

    // Rename the table indexes and sequence before moving to legacy
    await DB.none(`alter table ${schema}.repository rename to ${archiveName}`)
    await DB.none(`alter index if exists ${schema}.repository_pkey rename to ${archiveName}_pkey`)
    await DB.none(`alter index if exists ${schema}.repository_uuid_key rename to ${archiveName}_uuid_key`)
    await DB.none(`alter sequence if exists ${schema}.repository_id_seq rename to ${archiveName}_id_seq`)
    await DB.none(`alter table ${schema}.${archiveName} set schema _legacy`)
  }

export default async (): Promise<void> => {
  const { exists } = await tableExists({ schema: 'public', tableName: 'repository' }, DB)
  if (!exists) await DB.none(getRepositoryDDL())

  // Use separate tx so the lock is released for the archiveCycleTable
  const assessments = await DB.tx(async (tx) => {
    const allAssessments = await AssessmentController.getAll({}, tx)
    await Promise.all(allAssessments.map(_migrateAssessment(tx)))
    return allAssessments
  })

  await DB.none('create schema if not exists _legacy')
  await Promise.all(assessments.flatMap((assessment) => assessment.cycles.map(_archiveCycleTable(assessment))))
}
