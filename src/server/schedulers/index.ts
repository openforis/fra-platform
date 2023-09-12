import { Queue, Worker } from 'bullmq'
import IORedis from 'ioredis'

import { AreaController } from 'server/controller/area'
import { AssessmentController } from 'server/controller/assessment'
import { ProcessEnv } from 'server/utils'
import { Logger } from 'server/utils/logger'

const connection = new IORedis(ProcessEnv.redisUrl)

const workers: Array<Worker> = []

export const initSchedulers = (): void => {
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
  workers.push(worker)

  queue.add('scheduler', undefined, { repeat: { every: 1000 * 60 * 60 } })
}

process.on('SIGTERM', async () => {
  await Promise.all(Object.values(workers).map((worker) => worker.close()))
  Logger.debug('[System schedulers] all workers closed')
})
