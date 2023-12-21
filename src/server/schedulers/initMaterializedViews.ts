import { Job, Queue, Worker } from 'bullmq'
import IORedis from 'ioredis'
import { Objects } from 'utils/objects'
import { Promises } from 'utils/promises'

import { CountryIso } from 'meta/area'

import { AreaController } from 'server/controller/area'
import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, DB } from 'server/db'
import { CountryActivityLogRepository } from 'server/repository/assessmentCycle/countryActivityLog'
import { Logger } from 'server/utils/logger'

const client: BaseProtocol = DB

// assessmentUuid->cycleUuid->[countryIso]
type ActivityLogEntries = Record<string, Record<string, Set<CountryIso>>>

const _getActivityLogEntries = async (props: { jobTimestamp: number }): Promise<ActivityLogEntries> => {
  const { jobTimestamp } = props

  const jobCreatedAt = new Date(jobTimestamp).toISOString()

  const activities = await client.map<{ assessmentUuid: string; cycleUuid: string; countryIso: CountryIso }>(
    `select assessment_uuid, cycle_uuid, country_iso from public.activity_log where time > $1 country_iso is not null and cycle_uuid is not null order by time desc`,
    [jobCreatedAt],
    (row) => Objects.camelize(row)
  )
  return activities.reduce<ActivityLogEntries>((acc, entry) => {
    const res = { ...acc }
    if (!res[entry.assessmentUuid]) res[entry.assessmentUuid] = {}
    if (!res[entry.assessmentUuid][entry.cycleUuid]) res[entry.assessmentUuid][entry.cycleUuid] = new Set()
    res[entry.assessmentUuid][entry.cycleUuid].add(entry.countryIso)
    return res
  }, {})
}

export const initMaterializedViews = (connection: IORedis): Worker => {
  const name = 'Scheduler-MaterializedViews'
  const queue = new Queue<void>(name, { connection, streams: { events: { maxLen: 1 } } })

  const worker = new Worker(
    name,
    async (job: Job) => {
      Logger.info(`[${name}] ** started`)

      const [assessments, entries] = await Promise.all([
        AssessmentController.getAll({}),
        _getActivityLogEntries({ jobTimestamp: job.timestamp }),
      ])

      await Promises.each(assessments, (assessment) =>
        Promises.each(assessment.cycles, async (cycle) => {
          // 1. refresh country summary
          await AreaController.refreshSummaries({ assessment, cycle })
          Logger.info(`[${name}:CountrySummary] ${assessment.props.name} ${cycle.name} refreshed`)

          // 2. refresh countries activity log
          const countryISOs = Array.from(entries[assessment.uuid]?.[cycle.uuid] ?? [])
          await Promises.each(countryISOs, async (countryIso) => {
            Logger.debug(`[${name}:CountryActivityLog] ${assessment.props.name} ${cycle.name} ${countryIso} refreshing`)
            await CountryActivityLogRepository.refreshMaterializedView({ assessment, cycle, countryIso })
            Logger.info(`[${name}:CountryActivityLog] ${assessment.props.name} ${cycle.name} ${countryIso} refreshed`)
          })
        })
      )

      Logger.info(`[${name}] ** terminated`)
    },
    { concurrency: 1, connection, lockDuration: 10_000, maxStalledCount: 0 }
  )

  queue.add(`${name}-immediate`, undefined, { removeOnComplete: true, removeOnFail: false })
  queue.add(`${name}-scheduler`, undefined, {
    repeat: { every: 1000 * 60 * 60 },
    removeOnComplete: true,
    removeOnFail: false,
  })

  return worker
}
