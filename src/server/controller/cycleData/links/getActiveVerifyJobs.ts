import { Job } from 'bullmq'

import { Assessment, Cycle } from 'meta/assessment'

import { VisitCycleLinksQueueFactory } from './visitCycleLinks/queueFactory'
import { VisitCycleLinksProps } from './visitCycleLinks'

type Props = {
  assessment: Assessment
  cycle: Cycle
}

export const getActiveVerifyJobs = async (props: Props): Promise<Array<Job<VisitCycleLinksProps>>> => {
  return VisitCycleLinksQueueFactory.getActiveJobs(props)
}
