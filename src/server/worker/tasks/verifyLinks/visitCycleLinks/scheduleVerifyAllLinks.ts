import { Job, JobsOptions } from 'bullmq'

import { LinksVerificationEvent } from 'meta/socket/event/links'

import { Logger } from 'server/utils/logger'
import { VerifyLinksJobName } from 'server/worker/tasks/verifyLinks/jobNames'
import { emitLinksVerificationEvent } from 'server/worker/tasks/verifyLinks/utils/emitLinksVerificationEvent'
import { VerifyLinksJob } from 'server/worker/tasks/verifyLinks/verifyLinksJob'

import { VerifyAllLinksJobProps } from './props'
import { VerifyLinksQueueFactory } from './queueFactory'

const jobOptions: JobsOptions = {
  attempts: 1,
  removeOnComplete: true,
  removeOnFail: true,
}

export const scheduleVerifyAllLinks = async (props: VerifyAllLinksJobProps): Promise<Job | undefined> => {
  const { assessment, countryIso, cycle } = props
  const scope = countryIso
    ? `${assessment.props.name} / ${cycle.name} / ${countryIso}`
    : `${assessment.props.name} / ${cycle.name}`

  // Skip if a verification job is already active.
  const activeJob = await VerifyLinksQueueFactory.getQueuedOrActiveVerifyAllLinksJob(props)
  const isVerificationInProgress = Boolean(activeJob)

  if (isVerificationInProgress) {
    Logger.debug(`[visitCycleLinks] skipping enqueue: verification already queued or running for ${scope}`)
    return undefined
  }

  const queue = VerifyLinksQueueFactory.getInstance()
  // Job ID is scoped by assessment/cycle so concurrent requests collapse to one job.
  const jobId = VerifyLinksQueueFactory.getVerifyAllLinksJobId({ assessment, countryIso, cycle })
  const job = await queue.add(VerifyLinksJobName.verifyAllLinks, props, { ...jobOptions, jobId })

  const verifyLinksJob = new VerifyLinksJob({ assessment, countryIso, cycle })
  await verifyLinksJob.setQueued(job.id?.toString())

  Logger.debug(`[visitCycleLinks] added visit all links job for ${scope} to the queue`)

  emitLinksVerificationEvent({ assessment, countryIso, cycle, event: LinksVerificationEvent.queued })

  return job
}
