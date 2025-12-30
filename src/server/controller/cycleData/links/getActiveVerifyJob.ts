import { Job } from 'bullmq'

import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'

import { VisitCycleLinksQueueFactory } from './visitCycleLinks/queueFactory'
import { VisitCycleLinksProps } from './visitCycleLinks'

type Props = {
  assessment: Assessment
  cycle: Cycle
}

export const getActiveVerifyJob = async (props: Props): Promise<Job<VisitCycleLinksProps> | null> => {
  return VisitCycleLinksQueueFactory.getQueuedOrActiveJob(props)
}
