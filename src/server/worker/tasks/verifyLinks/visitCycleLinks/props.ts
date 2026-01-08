import { Job } from 'bullmq'

import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { User } from 'meta/user/user'

export type VisitCycleLinksProps = {
  assessment: Assessment
  countryIso?: CountryIso
  cycle: Cycle
  user: User
}

export type VisitCycleLinksJob = Job<VisitCycleLinksProps>
