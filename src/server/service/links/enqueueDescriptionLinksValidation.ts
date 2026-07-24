import { Objects } from 'utils/objects'

import { VerifyLinksJobName } from 'server/worker/tasks/verifyLinks/jobNames'
import { addVerifyLinksJob } from 'server/worker/tasks/verifyLinks/utils/addVerifyLinksJob'
import { VerifyDescriptionLinksJobProps } from 'server/worker/tasks/verifyLinks/visitDescriptionLinks/props'

export const enqueueDescriptionLinksValidation = async (props: VerifyDescriptionLinksJobProps): Promise<void> => {
  const { descriptionIdentifiers } = props

  if (Objects.isEmpty(descriptionIdentifiers)) return

  await addVerifyLinksJob(VerifyLinksJobName.verifyDescriptionLinks, props)
}
