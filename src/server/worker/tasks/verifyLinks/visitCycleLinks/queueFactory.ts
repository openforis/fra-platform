import { Queue, QueueOptions } from 'bullmq'

import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'

import { ProcessEnv } from 'server/utils'
import { RedisClient } from 'server/utils/redis/client'
import { VerifyLinksJobName } from 'server/worker/tasks/verifyLinks/jobNames'
import { VerifyLinksQueueProps } from 'server/worker/tasks/verifyLinks/props'
import { VerifyAllLinksJob } from 'server/worker/tasks/verifyLinks/visitCycleLinks/props'

const queueName = 'verifyLinks'
let queue: Queue<VerifyLinksQueueProps> | undefined

const connection = RedisClient.newInstance(ProcessEnv.redisQueueUrl, { maxRetriesPerRequest: null })

type VerifyAllLinksJobScope = {
  assessment: Assessment
  countryIso?: CountryIso
  cycle: Cycle
}

const opts: QueueOptions = {
  connection,
  streams: { events: { maxLen: 1 } },
}

const getInstance = (): Queue<VerifyLinksQueueProps> => {
  if (queue) return queue

  queue = new Queue<VerifyLinksQueueProps>(queueName, opts)
  return queue
}

const getVerifyAllLinksJobId = (props: VerifyAllLinksJobScope): string => {
  const { assessment, countryIso, cycle } = props

  // Verify-all job ID with assessment/cycle to avoid requests from enqueuing duplicates.
  const baseJobId = `verifyLinks/${assessment.props.name}/${cycle.name}`
  return countryIso ? `${baseJobId}/${countryIso}` : baseJobId
}

const activeStates = ['active', 'delayed', 'paused', 'waiting', 'waiting-children']

const getQueuedOrActiveVerifyAllLinksJob = async (props: VerifyAllLinksJobScope): Promise<VerifyAllLinksJob | null> => {
  const queueInstance = getInstance()
  const job = await queueInstance.getJob(getVerifyAllLinksJobId(props))
  if (!job) return null
  if (job.name !== VerifyLinksJobName.verifyAllLinks) return null

  const state = await job.getState()
  return activeStates.includes(state) ? (job as VerifyAllLinksJob) : null
}

export const VerifyLinksQueueFactory = {
  connection,
  getInstance,
  getVerifyAllLinksJobId,
  getQueuedOrActiveVerifyAllLinksJob,
  queueName,
}
