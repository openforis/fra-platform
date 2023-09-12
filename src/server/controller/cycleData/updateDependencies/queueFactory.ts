import { Queue, QueueOptions, Worker } from 'bullmq'
import IORedis from 'ioredis'

import { CountryIso } from 'meta/area'
import { Assessment, Cycle } from 'meta/assessment'

import { ProcessEnv } from 'server/utils'
import { Logger } from 'server/utils/logger'

import { UpdateDependenciesProps } from './props'
import { WorkerFactory } from './workerFactory'

const queues: Record<string, Queue<UpdateDependenciesProps>> = {}
const workers: Record<string, Worker<UpdateDependenciesProps>> = {}

const connection = new IORedis(ProcessEnv.redisUrl)

const getInstance = (props: {
  assessment: Assessment
  cycle: Cycle
  countryIso: CountryIso
}): Queue<UpdateDependenciesProps> => {
  const { assessment, cycle, countryIso } = props

  const key = `persistNodeValue/dependenciesUpdate/${assessment.props.name}/${cycle.name}/${countryIso}`
  let queue = queues[key]

  if (queue) return queue

  workers[key] = WorkerFactory.newInstance({ key })

  const opts: QueueOptions = {
    connection,
    streams: { events: { maxLen: 10 } },
  }
  queue = new Queue<UpdateDependenciesProps>(key, opts)
  queues[key] = queue

  return queue
}

process.on('SIGTERM', async () => {
  await Promise.all(Object.values(workers).map((worker) => worker.close()))
  Logger.debug('[calculateAndValidateDependentNodesWorkers] all workers closed')
})

export const UpdateDependenciesQueueFactory = {
  connection,
  getInstance,
}
