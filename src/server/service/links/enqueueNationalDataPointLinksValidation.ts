import { Objects } from 'utils/objects'

import { VerifyLinksJobName } from 'server/worker/tasks/verifyLinks/jobNames'
import { enqueueVerifyLinksJob } from 'server/worker/tasks/verifyLinks/utils/enqueueVerifyLinksJob'
import { VerifyNationalDataPointLinksJobProps } from 'server/worker/tasks/verifyLinks/visitNationalDataPointLinks/props'

export const enqueueNationalDataPointLinksValidation = async (
  props: VerifyNationalDataPointLinksJobProps
): Promise<void> => {
  const { targets } = props

  if (Objects.isEmpty(targets)) return

  await enqueueVerifyLinksJob(VerifyLinksJobName.verifyNationalDataPointLinks, props)
}
