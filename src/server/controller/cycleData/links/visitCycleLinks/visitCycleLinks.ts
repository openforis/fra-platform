import { Job, JobsOptions } from 'bullmq'

import { Sockets } from 'meta/socket/sockets'

import { SocketServer } from 'server/service/socket'
import { Logger } from 'server/utils/logger'
import { VerifyLinksJob } from 'server/worker/tasks/verifyLinks/verifyLinksJob'

import { VisitCycleLinksProps } from './props'
import { VisitCycleLinksQueueFactory } from './queueFactory'

const jobOptions: JobsOptions = {
  attempts: 1,
  removeOnComplete: true,
  removeOnFail: true,
}

export const visitCycleLinks = async (props: VisitCycleLinksProps): Promise<Job<VisitCycleLinksProps>> | undefined => {
  const { assessment, cycle } = props

  // Skip if a verification job is already active.
  const activeJob = await VisitCycleLinksQueueFactory.getQueuedOrActiveJob(props)
  const isVerificationInProgress = Boolean(activeJob)

  if (isVerificationInProgress) {
    Logger.debug(
      `[visitCycleLinks] skipping enqueue: verification already queued or running for ${assessment.props.name} / ${cycle.name}`
    )
    return undefined
  }

  const queue = VisitCycleLinksQueueFactory.getInstance()
  // Job ID is scoped by assessment/cycle so concurrent requests collapse to one job.
  const jobId = VisitCycleLinksQueueFactory.getJobId({ assessment, cycle })
  const job = await queue.add('verifyLinks', props, { ...jobOptions, jobId })

  const verifyLinksJob = new VerifyLinksJob({ assessment, cycle })
  await verifyLinksJob.setQueued(job.id?.toString())

  Logger.debug(`[visitCycleLinks] added visit all links job for ${assessment.props.name} ${cycle.name} to the queue`)

  const linksVerificationEvent = Sockets.getLinksVerificationEvent({
    assessmentName: assessment.props.name,
    cycleName: cycle.name,
  })
  SocketServer.emit(linksVerificationEvent, { event: 'queued' })

  return job
}
