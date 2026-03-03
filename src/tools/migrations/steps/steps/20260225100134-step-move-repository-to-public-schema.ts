import pgPromise from 'pg-promise'

import { Assessment } from 'meta/assessment/assessment'
import { Cycle, CycleUuid } from 'meta/assessment/cycle'
import { RepositoryItemProps } from 'meta/cycleData/repository/item'
import { Promises } from 'utils/promises'

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

const _resolveItems = (assessment: Assessment, cyclesWithItems: Array<CycleItems>): Array<DBRepositoryItemInsert> => {
  const acc: Record<string, DBRepositoryItemInsert> = {}
  const assessmentUuid = assessment.uuid

  // Hidden files have no assessment_uuid and cycle_uuid
  const _hiddenFile = (item: DBRepositoryItem): void => {
    if (!acc[item.uuid]) acc[item.uuid] = { ...item, assessmentUuid: null, cycleUuid: null }
  }

  // Global items have assessment_uuid and cycle_uuid.
  // Deduplicate items by: link (outside links) -> translation (platform files) -> item.uuid (as fallback)
  const _globalItemKey = (item: DBRepositoryItem): string => item.link ?? item.props?.translation?.en ?? item.uuid

  const _globalItem = (item: DBRepositoryItem, cycleUuid: CycleUuid): void => {
    const key = _globalItemKey(item)
    if (!acc[key]) acc[key] = { ...item, assessmentUuid, cycleUuid }
  }

  // Country items have assessment_uuid, cycle_uuid and "newest/latest" props in case of duplication
  const _countryItem = (item: DBRepositoryItem, cycleUuid: CycleUuid): void => {
    if (acc[item.uuid]) acc[item.uuid].props = item.props
    else acc[item.uuid] = { ...item, assessmentUuid, cycleUuid }
  }

  cyclesWithItems.forEach(({ cycleUuid, items }) => {
    items.forEach((item) => {
      if (!item.country_iso && item.props?.hidden === true) _hiddenFile(item)
      else if (!item.country_iso) _globalItem(item, cycleUuid)
      else _countryItem(item, cycleUuid)
    })
  })

  return Object.values(acc)
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
    const resolved = _resolveItems(assessment, cyclesWithItems)

    await _insertItems(resolved, client)
  }

export default async (client: BaseProtocol): Promise<void> => {
  // create public table if not exists
  const { exists } = await tableExists({ schema: 'public', tableName: 'repository' }, client)
  if (!exists) await DB.none(getRepositoryDDL())

  const assessments = await AssessmentController.getAll({}, client)
  await Promises.each(assessments, _migrateAssessment(client))
}
