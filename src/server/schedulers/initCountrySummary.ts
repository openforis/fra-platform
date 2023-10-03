import { Queue, Worker } from 'bullmq'
import IORedis from 'ioredis'

import { AreaController } from 'server/controller/area'
import { AssessmentController } from 'server/controller/assessment'
import { Logger } from 'server/utils/logger'

export const initCountrySummary = (connection: IORedis): Worker => {
  const name = 'countrySummaryQueue'
  const queue = new Queue<void>(name, { connection, streams: { events: { maxLen: 1 } } })

  const worker = new Worker(
    name,
    async () => {
      Logger.info(`[System schedulers] ** ${name} started`)

      const assessments = await AssessmentController.getAll({})

      await Promise.all(
        assessments.map((assessment) =>
          Promise.all(
            assessment.cycles.map(async (cycle) => {
              await AreaController.refreshSummaries({ assessment, cycle })
              Logger.info(`CountrySummary ${assessment.props.name} ${cycle.name} refreshed`)
            })
          )
        )
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
