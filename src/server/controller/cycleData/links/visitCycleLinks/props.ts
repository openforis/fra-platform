import { Job } from 'bullmq'

import { Assessment } from 'meta/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { User } from 'meta/user'

export type VisitCycleLinksProps = {
  assessment: Assessment
  cycle: Cycle
  user: User
}

export type VisitCycleLinksJob = Job<VisitCycleLinksProps>
