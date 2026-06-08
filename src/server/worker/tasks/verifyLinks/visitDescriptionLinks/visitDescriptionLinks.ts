import { Job, JobsOptions } from 'bullmq'

import { Objects } from 'utils/objects'

import { Logger } from 'server/utils/logger'
import { VerifyLinksJobName } from 'server/worker/tasks/verifyLinks/jobNames'
import { triggerVerifyLinksWorker } from 'server/worker/tasks/verifyLinks/triggerVerifyLinksWorker'
import { VerifyLinksQueueFactory } from 'server/worker/tasks/verifyLinks/visitCycleLinks/queueFactory'

import { VerifyDescriptionLinksJobProps } from './props'

const jobOptions: JobsOptions = {
  attempts: 1,
  removeOnComplete: true,
  removeOnFail: true,
}

export const visitDescriptionLinks = async (props: VerifyDescriptionLinksJobProps): Promise<Job | undefined> => {
  const { assessment, countryIso, cycle, descriptionTargets } = props

  if (Objects.isEmpty(descriptionTargets)) return undefined

  const queue = VerifyLinksQueueFactory.getInstance()
  const job = await queue.add(VerifyLinksJobName.verifyDescriptionLinks, props, jobOptions)

  Logger.debug(
    `[visitDescriptionLinks] added description links job for ${assessment.props.name} / ${cycle.name} / ${countryIso}`
  )

  void triggerVerifyLinksWorker().catch((error) => {
    Logger.error(`[visitDescriptionLinks] failed to trigger verify links worker: ${JSON.stringify(error)}`)
  })

  return job
}
