import { Worker, WorkerOptions } from 'bullmq'
import IORedis from 'ioredis'

import { ProcessEnv } from 'server/utils'
import { Logger } from 'server/utils/logger'

import { VisitCycleLinksProps } from './props'
import workerProcessor from './worker'

const connection = new IORedis(ProcessEnv.redisQueueUrl)

const workerOptions: WorkerOptions = {
  concurrency: 1,
  connection,
  lockDuration: 60_000,
  maxStalledCount: 0,
}

const newInstance = (props: { key: string }) => {
  const { key } = props

  const worker = new Worker<VisitCycleLinksProps>(key, workerProcessor, workerOptions)

  worker.on('error', (error) => {
    Logger.error(`[visitCycleLinks-worker] job error ${error}`)
  })

  return worker
}

export const WorkerFactory = {
  connection,
  newInstance,
}
