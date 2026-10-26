import { Job } from 'bullmq'

import { VerifyAllLinksJobProps } from 'server/worker/tasks/verifyLinks/visitCycleLinks/props'
import { VerifyDescriptionLinksJobProps } from 'server/worker/tasks/verifyLinks/visitDescriptionLinks/props'
import { VerifyNationalDataPointLinksJobProps } from 'server/worker/tasks/verifyLinks/visitNationalDataPointLinks/props'

export type VerifyLinksQueueProps =
  | VerifyAllLinksJobProps
  | VerifyDescriptionLinksJobProps
  | VerifyNationalDataPointLinksJobProps

export type VerifyLinksQueueJob = Job<VerifyLinksQueueProps>
