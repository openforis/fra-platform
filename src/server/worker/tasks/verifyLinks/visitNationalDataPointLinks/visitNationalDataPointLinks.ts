import { Job } from 'bullmq'

import { Objects } from 'utils/objects'

import { VerifyLinksJobName } from 'server/worker/tasks/verifyLinks/jobNames'
import { addVerifyLinksJob } from 'server/worker/tasks/verifyLinks/utils/addVerifyLinksJob'

import { VerifyNationalDataPointLinksJobProps } from './props'

export const visitNationalDataPointLinks = async (
  props: VerifyNationalDataPointLinksJobProps
): Promise<Job | undefined> => {
  const { targets } = props

  if (Objects.isEmpty(targets)) return undefined

  return addVerifyLinksJob(VerifyLinksJobName.verifyNationalDataPointLinks, props)
}
