import { Queue, Worker } from 'bullmq'
import IORedis from 'ioredis'

import { CountryIso } from '@meta/area'
import { Assessment, Cycle } from '@meta/assessment'

import { ProcessEnv } from '@server/utils'
import { Logger } from '@server/utils/logger'

import { DependantsUpdateProps } from './props'

const queues: Record<string, Queue<DependantsUpdateProps>> = {}
const workers: Record<string, Worker<DependantsUpdateProps>> = {}

export const getInstance = (props: {
  assessment: Assessment
  cycle: Cycle
  countryIso: CountryIso
}): Queue<DependantsUpdateProps> => {
  const { assessment, cycle, countryIso } = props

  const key = `persistNodeValue/dependenciesUpdate/${assessment.props.name}/${cycle.name}/${countryIso}`
  let queue = queues[key]

  if (queue) return queue

  const worker = new Worker(key, `${__dirname}/workers/calculateAndValidateDependentNodesWorker.js`, {
    concurrency: 1,
    maxStalledCount: 0,
    lockDuration: 60_000,
    connection: new IORedis(ProcessEnv.redisUrl),
  })
  worker.on('completed', (job, result, prev) => {
    // TODO pass nodeUpdates to websocket
    Logger.debug(`[calculateAndValidateDependentNodesWorker] job completed ${job}, ${result}, ${prev}`)
  })
  worker.on('error', (error) => {
    Logger.error(`[calculateAndValidateDependentNodesWorker] job error ${error}`)
  })
  workers[key] = worker

  queue = new Queue<DependantsUpdateProps>(key, { connection: new IORedis(ProcessEnv.redisUrl) })
  queues[key] = queue

  return queue
}

export const QueueFactory = {
  getInstance,
}
