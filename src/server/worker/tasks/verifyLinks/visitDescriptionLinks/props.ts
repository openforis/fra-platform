import { Job } from 'bullmq'

import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'

import { VerifyLinksJobName } from 'server/worker/tasks/verifyLinks/jobNames'

export type VerifyDescriptionLinksJobProps = {
  assessment: Assessment
  countryIso: CountryIso
  cycle: Cycle
  descriptionIds: Array<number>
}

export type VerifyDescriptionLinksJob = Job<
  VerifyDescriptionLinksJobProps,
  void,
  typeof VerifyLinksJobName.verifyDescriptionLinks
>
