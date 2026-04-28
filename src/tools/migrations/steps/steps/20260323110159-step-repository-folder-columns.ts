import pgPromise from 'pg-promise'

import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { Promises } from 'utils/promises'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol } from 'server/db/db'
import { Schemas } from 'server/db/schemas'

type LogEntry = {
  time: Date
  country_iso: string | null
  target: Record<string, string>
}

type RepositoryRow = {
  uuid: string
  file_uuid: string | null
  link: string | null
  country_iso: string | null
  label: string | null
}

type UpdateRow = {
  uuid: string
  created_at: Date
}

type PrevCycleData = {
  byUuid: Map<string, Date>
  byFileUuid: Map<string, Date>
  byLink: Map<string, Date>
}

// Stable key that handles null country_iso (global items).
const _key = (countryIso: string | null, name: string): string => `${countryIso ?? ''}:${name}`

const _updateMin = (map: Map<string, Date>, key: string, time: Date): void => {
  const existing = map.get(key)
  if (!existing || time < existing) map.set(key, time)
}

type LogIndexes = {
  byFile: Map<string, Date>
  byFileUuid: Map<string, Date>
  byUuid: Map<string, Date>
}

const _buildLogIndexes = (logEntries: Array<LogEntry>, fileNameToUuid: Map<string, string>): LogIndexes => {
  const byFile = new Map<string, Date>()
  const byFileUuid = new Map<string, Date>()
  const byUuid = new Map<string, Date>()

  logEntries.forEach((entry) => {
    const { uuid } = entry.target
    if (uuid) _updateMin(byUuid, uuid, entry.time)

    const fileName = entry.target['file'] ?? entry.target['fileName']
    if (fileName) {
      _updateMin(byFile, _key(entry.country_iso, fileName), entry.time)
      const fileUuid = fileNameToUuid.get(fileName)
      if (fileUuid) _updateMin(byFileUuid, _key(entry.country_iso, fileUuid), entry.time)
    }
  })

  return { byFile, byFileUuid, byUuid }
}

type ResolveTimeProps = {
  cycleCreatedAt: Date
  indexes: LogIndexes
  item: RepositoryRow
  prevCycleData: PrevCycleData | null
}

const _resolveTime = (props: ResolveTimeProps): Date => {
  const { cycleCreatedAt, indexes, item, prevCycleData } = props

  const byUuid = indexes.byUuid.get(item.uuid)
  const byFileUuid = item.file_uuid ? indexes.byFileUuid.get(_key(item.country_iso, item.file_uuid)) : undefined
  const byFile = item.label ? indexes.byFile.get(_key(item.country_iso, item.label)) : undefined
  const fromLog = byUuid ?? byFileUuid ?? byFile

  const prevByUuid = prevCycleData?.byUuid.get(item.uuid)
  const prevByFileUuid = item.file_uuid ? prevCycleData?.byFileUuid.get(item.file_uuid) : undefined
  const prevByLink = item.link ? prevCycleData?.byLink.get(item.link) : undefined
  const fromPrevCycle = prevByUuid ?? prevByFileUuid ?? prevByLink

  // activity_log match, then inherited from previous cycle, then cycle creation date as last resort
  return fromLog ?? fromPrevCycle ?? cycleCreatedAt
}

type ProcessCycleProps = {
  assessment: Assessment
  cycle: Cycle
  indexes: LogIndexes
  prevCycleData: PrevCycleData | null
}

const _processCycle = async (props: ProcessCycleProps, client: BaseProtocol): Promise<PrevCycleData> => {
  const { assessment, cycle, indexes, prevCycleData } = props
  const schema = Schemas.getNameCycle(assessment, cycle)
  const cycleCreatedAt = new Date(cycle.props.dateCreated)

  const items = await client.manyOrNone<RepositoryRow>(
    `select uuid, file_uuid, link, country_iso, props->'translation'->>'en' as label
     from ${schema}.repository`
  )

  const result: PrevCycleData = { byUuid: new Map(), byFileUuid: new Map(), byLink: new Map() }

  const updates = items.map<UpdateRow>((item) => {
    const time = _resolveTime({ cycleCreatedAt, indexes, item, prevCycleData })

    result.byUuid.set(item.uuid, time)
    if (item.file_uuid) result.byFileUuid.set(item.file_uuid, time)
    if (item.link) result.byLink.set(item.link, time)

    return { uuid: item.uuid, created_at: time }
  })

  const pgp = pgPromise()
  const cs = new pgp.helpers.ColumnSet<UpdateRow>(
    [
      { name: 'created_at', cast: 'timestamptz' },
      { name: 'uuid', cast: 'uuid', cnd: true },
    ],
    { table: { table: 'repository', schema } }
  )

  if (updates.length > 0) await client.none(`${pgp.helpers.update(updates, cs)} where v.uuid = t.uuid`)

  return result
}

const _migrateCreatedAt = async (assessments: Array<Assessment>, client: BaseProtocol): Promise<void> => {
  // get activity_log entries for all repositoryItemCreate events
  const logEntries = await client.manyOrNone<LogEntry>(
    `select time, country_iso, target from public.activity_log where message = $(message)`,
    { message: ActivityLogMessage.repositoryItemCreate }
  )

  const fileRows = await client.manyOrNone<{ uuid: string; name: string }>(`select uuid, name from public.file`)
  const fileNameToUuid = new Map(fileRows.map((f) => [f.name, f.uuid]))
  const indexes = _buildLogIndexes(logEntries, fileNameToUuid)

  await Promise.all(
    assessments.map(async (assessment) => {
      let prevCycleData: PrevCycleData | null = null
      await Promises.each(assessment.cycles, async (cycle) => {
        prevCycleData = await _processCycle({ assessment, cycle, indexes, prevCycleData }, client)
      })
    })
  )
}

export default async (client: BaseProtocol): Promise<void> => {
  const assessments = await AssessmentController.getAll({}, client)

  // Add columns for all cycles in parallel (idempotent DDL).
  await Promise.all(
    assessments.flatMap((assessment) =>
      assessment.cycles.map((cycle) => {
        const schema = Schemas.getNameCycle(assessment, cycle)
        return Promise.all([
          client.none(`alter table ${schema}.repository add column if not exists folder_name varchar`),
          client.none(
            `alter table ${schema}.repository add column if not exists parent_uuid uuid references ${schema}.repository(uuid) on delete set null`
          ),
          client.none(`alter table ${schema}.repository add column if not exists description text`),
          client.none(
            `alter table ${schema}.repository add column if not exists created_at timestamptz not null default now()`
          ),
        ])
      })
    )
  )

  await _migrateCreatedAt(assessments, client)
}
