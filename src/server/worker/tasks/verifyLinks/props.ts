import { Job } from 'bullmq'

import { VisitCycleLinksProps } from 'server/worker/tasks/verifyLinks/visitCycleLinks/props'
import { VisitDescriptionLinksProps } from 'server/worker/tasks/verifyLinks/visitDescriptionLinks/props'

export type VerifyLinksQueueProps = VisitCycleLinksProps | VisitDescriptionLinksProps

export type VerifyLinksQueueJob = Job<VerifyLinksQueueProps>
