import { Job, JobsOptions } from 'bullmq'

import { Logger } from 'server/utils/logger'

import { VisitCycleLinksProps } from './props'
import { VisitCycleLinksQueueFactory } from './queueFactory'

const jobOptions: JobsOptions = {
  attempts: 1,
  removeOnComplete: true,
  removeOnFail: true,
}

export const visitCycleLinks = (props: VisitCycleLinksProps): Promise<Job<VisitCycleLinksProps>> | undefined => {
  const { assessment, cycle } = props

  Logger.debug(`[visitCycleLinks] added visit all links job for ${assessment.props.name} ${cycle.name} to the queue`)

  // TODO: persist when this function is already running, and if so, return early.

  const queue = VisitCycleLinksQueueFactory.getInstance({ assessment, cycle })
  return queue.add('visitCycleLinks', props, jobOptions)
}
