import { Job, Queue } from 'bullmq'

import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'

import { RedisQueueClient } from 'server/redis/queueClient'

import { VisitCycleLinksProps } from './props'

const queueName = 'verifyLinks'
let queue: Queue<VisitCycleLinksProps> | undefined

type Props = {
  assessment: Assessment
  countryIso?: CountryIso
  cycle: Cycle
}

const getInstance = (): Queue<VisitCycleLinksProps> => {
  if (queue) return queue

  queue = new Queue<VisitCycleLinksProps>(queueName, {
    connection: RedisQueueClient.getInstance(),
    streams: { events: { maxLen: 1 } },
  })
  return queue
}

const getJobId = (props: Props): string => {
  const { assessment, countryIso, cycle } = props

  // Job ID with assessment/cycle to avoid requests from enqueuing duplicates.
  const baseJobId = `verifyLinks/${assessment.props.name}/${cycle.name}`
  return countryIso ? `${baseJobId}/${countryIso}` : baseJobId
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
  getInstance,
  getJobId,
  getQueuedOrActiveJob,
  queueName,
}
