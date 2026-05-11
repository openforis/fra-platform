import { Job } from 'bullmq'

import { VerifyAllLinksJobProps } from 'server/worker/tasks/verifyLinks/visitCycleLinks/props'
import { VerifyDescriptionLinksJobProps } from 'server/worker/tasks/verifyLinks/visitDescriptionLinks/props'

export type VerifyLinksQueueProps = VerifyAllLinksJobProps | VerifyDescriptionLinksJobProps

export type VerifyLinksQueueJob = Job<VerifyLinksQueueProps>
