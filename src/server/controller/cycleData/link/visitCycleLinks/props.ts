import { Job } from 'bullmq'

import { Assessment, Cycle } from 'meta/assessment'

export type VisitCycleLinksProps = {
  assessment: Assessment
  cycle: Cycle
}

export type VisitCycleLinksJob = Job<VisitCycleLinksProps>
