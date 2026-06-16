import { Queue, QueueOptions, Worker } from 'bullmq'
import IORedis from 'ioredis'

import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'

import { UpdateDependenciesProps } from 'server/controller/cycleData/tableData/updateDependencies/props'
import { WorkerFactory } from 'server/controller/cycleData/tableData/updateDependencies/workerFactory'
import { ProcessEnv } from 'server/utils'
import { Logger } from 'server/utils/logger'

const queues: Record<string, Queue<UpdateDependenciesProps>> = {}
const workers: Record<string, Worker<UpdateDependenciesProps>> = {}

const connection = new IORedis(ProcessEnv.redisQueueUrl)

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: CountryIso
}

const opts: QueueOptions = {
  connection,
  streams: { events: { maxLen: 5 } },
}

const getInstance = (props: Props): Queue<UpdateDependenciesProps> => {
  const { assessment, countryIso, cycle } = props

  const key = `persistNodeValue/dependenciesUpdate/${assessment.props.name}/${cycle.name}/${countryIso}`
  let queue = queues[key]

  if (queue) return queue

  workers[key] = WorkerFactory.newInstance({ key })

  queue = new Queue<UpdateDependenciesProps>(key, opts)
  queues[key] = queue

  return queue
}

process.on('SIGTERM', async () => {
  await Promise.all(Object.values(workers).map((worker) => worker.close()))
  Logger.debug('[updateDependencies] all workers closed')
})

export const UpdateDependenciesQueueFactory = {
  connection,
  getInstance,
}
