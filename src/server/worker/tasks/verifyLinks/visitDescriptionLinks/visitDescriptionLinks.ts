import { Job } from 'bullmq'

import { Objects } from 'utils/objects'

import { VerifyLinksJobName } from 'server/worker/tasks/verifyLinks/jobNames'
import { addVerifyLinksJob } from 'server/worker/tasks/verifyLinks/utils/addVerifyLinksJob'

import { VerifyDescriptionLinksJobProps } from './props'

export const visitDescriptionLinks = async (props: VerifyDescriptionLinksJobProps): Promise<Job | undefined> => {
  const { descriptionIdentifiers } = props

  if (Objects.isEmpty(descriptionIdentifiers)) return undefined

  return addVerifyLinksJob(VerifyLinksJobName.verifyDescriptionLinks, props)
}
