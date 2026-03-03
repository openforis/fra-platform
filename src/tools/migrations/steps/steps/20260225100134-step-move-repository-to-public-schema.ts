import { randomUUID } from 'crypto'
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
  country_iso: string
  file_uuid: string | null
  link: string | null
  props: RepositoryItemProps
}

type DBRepositoryItemInsert = DBRepositoryItem & { cycleUuid: CycleUuid }

type CycleItems = {
  cycleUuid: CycleUuid
  items: Array<DBRepositoryItem>
}

const _resolveItems = (cyclesWithItems: Array<CycleItems>): Array<DBRepositoryItemInsert> => {
  const globalAcc: Record<string, DBRepositoryItemInsert> = {}
  const countryAcc: Record<string, DBRepositoryItemInsert> = {}

  const addHiddenGlobal = (item: DBRepositoryItem, cycleUuid: CycleUuid): void => {
    // deduplicate: hidden files are not cycle-specific, keep first occurrence
    if (!globalAcc[item.uuid]) globalAcc[item.uuid] = { ...item, cycleUuid }
  }

  const addVisibleGlobal = (item: DBRepositoryItem, cycleUuid: CycleUuid): void => {
    // one row per cycle; generate a fresh uuid if the original is already taken
    const uuid = globalAcc[item.uuid] ? randomUUID() : item.uuid
    globalAcc[uuid] = { ...item, uuid, cycleUuid }
  }

  const addCountry = (item: DBRepositoryItem, cycleUuid: CycleUuid): void => {
    // deduplicate by uuid, keeping oldest cycle_uuid and updating props to newest
    if (countryAcc[item.uuid]) countryAcc[item.uuid].props = item.props
    else countryAcc[item.uuid] = { ...item, cycleUuid }
  }

  // iterate over cycles starting from oldest
  cyclesWithItems.forEach(({ cycleUuid, items }) => {
    items.forEach((item) => {
      if (!item.country_iso && item.props?.hidden === true) addHiddenGlobal(item, cycleUuid)
      else if (!item.country_iso) addVisibleGlobal(item, cycleUuid)
      else addCountry(item, cycleUuid)
    })
  })

  return [...Object.values(globalAcc), ...Object.values(countryAcc)]
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

// insert items to public.repository with cycle_uuid
const _insertItems = async (items: Array<DBRepositoryItemInsert>, client: BaseProtocol): Promise<void> => {
  if (items.length === 0) return

  const cs = new pgp.helpers.ColumnSet(
    [
      'uuid',
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
    // sort oldest to newest so cycle_uuid is assigned to the original cycle for repository item
    const cycles = [...assessment.cycles].sort((a, b) => a.id - b.id)
    const cyclesWithItems = await Promise.all(cycles.map(_migrateCycle(assessment, client)))
    const resolved = _resolveItems(cyclesWithItems)

    await _insertItems(resolved, client)
  }

export default async (client: BaseProtocol): Promise<void> => {
  // create public table if not exists
  const { exists } = await tableExists({ schema: 'public', tableName: 'repository' }, client)
  if (!exists) await DB.none(getRepositoryDDL())

  const assessments = await AssessmentController.getAll({}, client)
  await Promises.each(assessments, _migrateAssessment(client))
}
