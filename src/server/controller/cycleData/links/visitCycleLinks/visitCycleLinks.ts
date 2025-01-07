import { Job, JobsOptions } from 'bullmq'

import { Logger } from 'server/utils/logger'

import { VisitCycleLinksProps } from './props'
import { VisitCycleLinksQueueFactory } from './queueFactory'

const jobOptions: JobsOptions = {
  attempts: 1,
  removeOnComplete: true,
  removeOnFail: true,
}

export const visitCycleLinks = async (props: VisitCycleLinksProps): Promise<Job<VisitCycleLinksProps>> | undefined => {
  const { assessment, cycle } = props

  Logger.debug(`[visitCycleLinks] added visit all links job for ${assessment.props.name} ${cycle.name} to the queue`)

  const activeJobs = await VisitCycleLinksQueueFactory.getActiveJobs(props)
  const isVerificationInProgress = activeJobs.length > 0

  if (isVerificationInProgress) return undefined

  const queue = VisitCycleLinksQueueFactory.getInstance({ assessment, cycle })
  return queue.add('visitCycleLinks', props, jobOptions)
}
