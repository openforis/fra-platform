import { Job } from 'bullmq'

import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { DescriptionIdentifier } from 'meta/assessment/descriptionValue'

import { VerifyLinksJobName } from 'server/worker/tasks/verifyLinks/jobNames'

export type VerifyDescriptionLinksJobProps = {
  assessment: Assessment
  countryIso: CountryIso
  cycle: Cycle
  descriptionTargets: Array<DescriptionIdentifier>
}

export type VerifyDescriptionLinksJob = Job<
  VerifyDescriptionLinksJobProps,
  void,
  typeof VerifyLinksJobName.verifyDescriptionLinks
>
