import { Job } from 'bullmq'

import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'

import { VisitCycleLinksProps } from 'server/worker/tasks/verifyLinks/visitCycleLinks/props'
import { VisitCycleLinksQueueFactory } from 'server/worker/tasks/verifyLinks/visitCycleLinks/queueFactory'

type Props = {
  assessment: Assessment
  countryIso?: CountryIso
  cycle: Cycle
}

export const getActiveVerifyJob = async (props: Props): Promise<Job<VisitCycleLinksProps> | null> => {
  return VisitCycleLinksQueueFactory.getQueuedOrActiveJob(props)
}
