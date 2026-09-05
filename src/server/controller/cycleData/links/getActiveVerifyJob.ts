import { Job } from 'bullmq'

import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'

import { VerifyAllLinksJobProps } from 'server/worker/tasks/verifyLinks/visitCycleLinks/props'
import { VerifyLinksQueueFactory } from 'server/worker/tasks/verifyLinks/visitCycleLinks/queueFactory'

type Props = {
  assessment: Assessment
  countryIso?: CountryIso
  cycle: Cycle
}

export const getActiveVerifyJob = async (props: Props): Promise<Job<VerifyAllLinksJobProps> | null> => {
  return VerifyLinksQueueFactory.getQueuedOrActiveVerifyAllLinksJob(props)
}
