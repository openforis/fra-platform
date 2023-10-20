import { Queue, Worker } from 'bullmq'
import IORedis from 'ioredis'
import { Promises } from 'utils/promises'

import { AreaController } from 'server/controller/area'
import { AssessmentController } from 'server/controller/assessment'
import { CountryActivityLogRepository } from 'server/repository/assessmentCycle/countryActivityLog'
import { Logger } from 'server/utils/logger'

export const initCountryActivityLog = (connection: IORedis): Worker => {
  const name = 'countryActivityLogQueue'
  const queue = new Queue<void>(name, { connection, streams: { events: { maxLen: 1 } } })

  const worker = new Worker(
    name,
    async () => {
      Logger.info(`[System schedulers] ** ${name} started`)

      const assessments = await AssessmentController.getAll({})

      await Promises.each(assessments, (assessment) =>
        Promises.each(assessment.cycles, async (cycle) => {
          const countryISOs = await AreaController.getCountries({ assessment, cycle })
          return Promises.each(countryISOs, async ({ countryIso }) => {
            const props = { assessment, cycle, countryIso }
            Logger.info(
              `[System schedulers] ** ${name} Refreshing materialized view for ${assessment.props.name} ${cycle.name}} ${countryIso}`
            )
            return CountryActivityLogRepository.refreshMaterializedView(props)
          })
        })
      )

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
