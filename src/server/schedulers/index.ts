import { Worker } from 'bullmq'
import IORedis from 'ioredis'

import { initMaterializedViews } from 'server/schedulers/initMaterializedViews'
import { ProcessEnv } from 'server/utils'
import { Logger } from 'server/utils/logger'

const connection = new IORedis(ProcessEnv.redisQueueUrl)
const workers: Array<Worker> = []

export const initSchedulers = (): void => {
  workers.push(initMaterializedViews(connection))
}

process.on('SIGTERM', async () => {
  Logger.debug('[System schedulers] SIGTERM received')
  await Promise.all(Object.values(workers).map((worker) => worker.close()))
  Logger.debug('[System schedulers] all workers closed')
  process.exit()
})
