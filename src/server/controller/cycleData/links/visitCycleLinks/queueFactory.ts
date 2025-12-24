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

const getActiveJobs = async (_props: Props): Promise<Array<Job<VisitCycleLinksProps>>> => {
  const queue = getInstance()
  const activeJobs: Array<Job<VisitCycleLinksProps>> = await queue.getActive()
  return activeJobs
}

const getJobId = (props: Props): string => {
  const { assessment, cycle } = props

  return `verifyLinks/${assessment.props.name}/${cycle.name}`
}

export const VisitCycleLinksQueueFactory = {
  connection,
  getActiveJobs,
  getInstance,
  getJobId,
  queueName,
}
