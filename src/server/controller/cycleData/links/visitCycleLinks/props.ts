import { Job } from 'bullmq'

import { Assessment, Cycle } from 'meta/assessment'
import { User } from 'meta/user'

export type VisitCycleLinksProps = {
  assessment: Assessment
  cycle: Cycle
  user: User
}

export type VisitCycleLinksJob = Job<VisitCycleLinksProps>
