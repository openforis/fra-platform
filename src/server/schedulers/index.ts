import { Worker } from 'bullmq'
import IORedis from 'ioredis'

import { initCountryActivityLog } from 'server/schedulers/initCountryActivityLog'
import { initCountrySummary } from 'server/schedulers/initCountrySummary'
import { ProcessEnv } from 'server/utils'
import { Logger } from 'server/utils/logger'

const connection = new IORedis(ProcessEnv.redisQueueUrl)
const workers: Array<Worker> = []

export const initSchedulers = (): void => {
  workers.push(initCountrySummary(connection))
  workers.push(initCountryActivityLog(connection))
}

process.on('SIGTERM', async () => {
  await Promise.all(Object.values(workers).map((worker) => worker.close()))
  Logger.debug('[System schedulers] all workers closed')
})
