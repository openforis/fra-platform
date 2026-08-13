import { Job, JobsOptions } from 'bullmq'

import { Logger } from 'server/utils/logger'
import { VerifyLinksJobName } from 'server/worker/tasks/verifyLinks/jobNames'
import { triggerVerifyLinksWorker } from 'server/worker/tasks/verifyLinks/triggerVerifyLinksWorker'
import { VerifyLinksQueueFactory } from 'server/worker/tasks/verifyLinks/visitCycleLinks/queueFactory'
import { VerifyDescriptionLinksJobProps } from 'server/worker/tasks/verifyLinks/visitDescriptionLinks/props'
import { VerifyNationalDataPointLinksJobProps } from 'server/worker/tasks/verifyLinks/visitNationalDataPointLinks/props'

const jobOptions: JobsOptions = {
  attempts: 1,
  removeOnComplete: true,
  removeOnFail: true,
}

type JobPropsByName = {
  [VerifyLinksJobName.verifyDescriptionLinks]: VerifyDescriptionLinksJobProps
  [VerifyLinksJobName.verifyNationalDataPointLinks]: VerifyNationalDataPointLinksJobProps
}

// Enqueues a verify-links job and makes sure a worker is running to consume it.
export const enqueueVerifyLinksJob = async <JobName extends keyof JobPropsByName>(
  jobName: JobName,
  props: JobPropsByName[JobName]
): Promise<Job> => {
  const { assessment, countryIso, cycle } = props

  const queue = VerifyLinksQueueFactory.getInstance()
  const job = await queue.add(jobName, props, jobOptions)

  Logger.debug(`[${jobName}] added job for ${assessment.props.name} / ${cycle.name} / ${countryIso}`)

  void triggerVerifyLinksWorker().catch((error) => {
    Logger.error(`[${jobName}] failed to trigger verify links worker: ${JSON.stringify(error)}`)
  })

  return job
}
