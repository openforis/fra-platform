import { Job, Queue, Worker } from 'bullmq'
import IORedis from 'ioredis'
import { Objects } from 'utils/objects'
import { Promises } from 'utils/promises'

import { CountryIso } from 'meta/area'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, DB } from 'server/db'
import { CountryActivityLogRepository } from 'server/repository/assessmentCycle/countryActivityLog'
import { Logger } from 'server/utils/logger'

const client: BaseProtocol = DB

type NewActivityLogEntry = {
  assessmentUuid: string
  cycleUuid: string
  countryIso: CountryIso
}
export const initCountryActivityLog = (connection: IORedis): Worker => {
  const name = 'countryActivityLogQueue'
  const queue = new Queue<void>(name, { connection, streams: { events: { maxLen: 1 } } })

  const worker = new Worker(
    name,
    async (job: Job) => {
      Logger.info(`[System schedulers] ** ${name} started`)

      const jobCreatedAt = new Date(job.timestamp).toISOString()

      const newActivityLogEntries = await client.map<NewActivityLogEntry>(
        `select assessment_uuid, cycle_uuid, country_iso from public.activity_log where time > $1 order by time desc`,
        [jobCreatedAt],
        (row) => Objects.camelize(row)
      )

      const assessments = await AssessmentController.getAll({})

      await Promises.each(newActivityLogEntries, (newActivitiyLogEntry) => {
        const { assessmentUuid, cycleUuid, countryIso } = newActivitiyLogEntry
        const assessment = assessments.find((assessment) => assessment.uuid === assessmentUuid)
        const cycle = assessment.cycles.find((cycle) => cycle.uuid === cycleUuid)

        const loggerProps = `${assessment.props.name} ${cycle.name}} ${countryIso}`
        Logger.info(`[System schedulers] ** ${name} Refreshing materialized view for ${loggerProps}`)

        const props = { assessment, cycle, countryIso }
        return CountryActivityLogRepository.refreshMaterializedView(props)
      })

      Logger.info(`[System schedulers] ** ${name} terminated`)
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
