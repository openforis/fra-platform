import { Job } from 'bullmq'

import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'

import { VerifyLinksJobName } from 'server/worker/tasks/verifyLinks/jobNames'

export type VerifyNationalDataPointLinksJobProps = {
  assessment: Assessment
  countryIso: CountryIso
  cycle: Cycle
  notifyClients?: boolean
  // TODO: targets: Array<NDPLinkTarget>
  targets: Array<string>
}

export type VerifyNationalDataPointLinksJob = Job<
  VerifyNationalDataPointLinksJobProps,
  void,
  typeof VerifyLinksJobName.verifyNationalDataPointLinks
>
