import { Job } from 'bullmq'

import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { User } from 'meta/user/user'

import { VerifyLinksJobName } from 'server/worker/tasks/verifyLinks/jobNames'

export type VerifyAllLinksJobProps = {
  assessment: Assessment
  countryIso?: CountryIso
  cycle: Cycle
  user: User
}

export type VerifyAllLinksJob = Job<VerifyAllLinksJobProps, void, typeof VerifyLinksJobName.verifyAllLinks>
