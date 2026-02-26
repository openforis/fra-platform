import pgPromise from 'pg-promise'

import { Assessment } from 'meta/assessment/assessment'
import { Cycle, CycleUuid } from 'meta/assessment/cycle'
import { Promises } from 'utils/promises'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, DB } from 'server/db/db'
import { getRepositoryDDL } from 'server/db/repository/public/ddl/getCreatePublicSchemaDDL'
import { Schemas } from 'server/db/schemas'

import { exists as tableExists } from './utils/tableExists'

const pgp = pgPromise()

type DBRepositoryItem = {
  uuid: string
  country_iso: string
  file_uuid: string | null
  link: string | null
  props: Record<string, unknown>
}

type DBRepositoryItemInsert = DBRepositoryItem & { cycleUuid: CycleUuid }

type CycleItems = {
  cycleUuid: CycleUuid
  items: Array<DBRepositoryItem>
}

const _resolveItems = (cyclesWithItems: Array<CycleItems>): Array<DBRepositoryItemInsert> => {
  const acc: Record<string, DBRepositoryItemInsert> = {}

  // Iterate over cycles starting from oldest: if item is found another time: update props
  // e.g. 2020 item found in 2025 -> keep cycle_uuid from 2020 but update props from 2025
  cyclesWithItems.forEach(({ cycleUuid, items }) => {
    items.forEach((item) => {
      // if item already exists, update props
      if (acc[item.uuid]) {
        // only update props for country-specific items; global items keep props from the oldest cycle
        if (item.country_iso) acc[item.uuid].props = item.props
      } else {
        acc[item.uuid] = { ...item, cycleUuid }
      }
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
