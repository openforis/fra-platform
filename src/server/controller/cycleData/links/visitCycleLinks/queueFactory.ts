import { Job, Queue, QueueOptions, Worker } from 'bullmq'
import IORedis from 'ioredis'

import { Assessment, Cycle } from 'meta/assessment'

import { ProcessEnv } from 'server/utils'
import { Logger } from 'server/utils/logger'

import { VisitCycleLinksProps } from './props'
import { WorkerFactory } from './workerFactory'

const queues: Record<string, Queue<VisitCycleLinksProps>> = {}
const workers: Record<string, Worker<VisitCycleLinksProps>> = {}

const connection = new IORedis(ProcessEnv.redisQueueUrl)

type Props = {
  assessment: Assessment
  cycle: Cycle
}

const opts: QueueOptions = {
  connection,
  streams: { events: { maxLen: 1 } },
}

const getInstance = (props: Props): Queue<VisitCycleLinksProps> => {
  const { assessment, cycle } = props

  const key = `visitCycleLinks/${assessment.props.name}/${cycle.name}`
  let queue = queues[key]

  if (queue) return queue

  workers[key] = WorkerFactory.newInstance({ key })

  queue = new Queue<VisitCycleLinksProps>(key, opts)
  queues[key] = queue

  return queue
}

const getActiveJobs = async (props: Props): Promise<Array<Job<VisitCycleLinksProps>>> => {
  const queue = getInstance(props)
  const activeJobs: Array<Job<VisitCycleLinksProps>> = await queue.getActive()
  return activeJobs
}

process.on('SIGTERM', async () => {
  await Promise.all(Object.values(workers).map((worker) => worker.close()))
  Logger.debug('[visitCycleLinks] all workers closed')
})

export const VisitCycleLinksQueueFactory = {
  connection,
  getActiveJobs,
  getInstance,
}
