import { Job, Queue, QueueOptions } from 'bullmq'
import IORedis from 'ioredis'

import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'

import { ProcessEnv } from 'server/utils'

import { VisitCycleLinksProps } from './props'

const queueName = 'verifyLinks'
let queue: Queue<VisitCycleLinksProps> | undefined

const connection = new IORedis(ProcessEnv.redisQueueUrl)
connection.options.maxRetriesPerRequest = null

type Props = {
  assessment: Assessment
  cycle: Cycle
}

const opts: QueueOptions = {
  connection,
  streams: { events: { maxLen: 1 } },
}

const getInstance = (): Queue<VisitCycleLinksProps> => {
  if (queue) return queue

  queue = new Queue<VisitCycleLinksProps>(queueName, opts)
  return queue
}

const getJobId = (props: Props): string => {
  const { assessment, cycle } = props

  // Job ID with assessment/cycle to avoid requests from enqueuing duplicates.
  return `verifyLinks/${assessment.props.name}/${cycle.name}`
}

const activeStates = ['active', 'delayed', 'paused', 'waiting', 'waiting-children']

const getQueuedOrActiveJob = async (props: Props): Promise<Job<VisitCycleLinksProps> | null> => {
  const queueInstance = getInstance()
  const job = await queueInstance.getJob(getJobId(props))
  if (!job) return null

  const state = await job.getState()
  return activeStates.includes(state) ? job : null
}

export const VisitCycleLinksQueueFactory = {
  connection,
  getInstance,
  getJobId,
  getQueuedOrActiveJob,
  queueName,
}
