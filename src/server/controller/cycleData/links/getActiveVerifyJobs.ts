import { Job } from 'bullmq'

import { Assessment } from 'meta/assessment'
import { Cycle } from 'meta/assessment/cycle'

import { VisitCycleLinksQueueFactory } from './visitCycleLinks/queueFactory'
import { VisitCycleLinksProps } from './visitCycleLinks'

type Props = {
  assessment: Assessment
  cycle: Cycle
}

export const getActiveVerifyJobs = async (props: Props): Promise<Array<Job<VisitCycleLinksProps>>> => {
  return VisitCycleLinksQueueFactory.getActiveJobs(props)
}
