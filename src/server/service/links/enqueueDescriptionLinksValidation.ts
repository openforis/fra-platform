import { Objects } from 'utils/objects'

import { VerifyLinksJobName } from 'server/worker/tasks/verifyLinks/jobNames'
import { enqueueVerifyLinksJob } from 'server/worker/tasks/verifyLinks/utils/enqueueVerifyLinksJob'
import { VerifyDescriptionLinksJobProps } from 'server/worker/tasks/verifyLinks/visitDescriptionLinks/props'

export const enqueueDescriptionLinksValidation = async (props: VerifyDescriptionLinksJobProps): Promise<void> => {
  const { descriptionKeys } = props

  if (Objects.isEmpty(descriptionKeys)) return

  await enqueueVerifyLinksJob(VerifyLinksJobName.verifyDescriptionLinks, props)
}
