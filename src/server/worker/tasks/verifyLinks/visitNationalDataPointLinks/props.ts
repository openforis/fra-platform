import { Job } from 'bullmq'

import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { NDPLinkTarget } from 'meta/cycleData/links/nationalDataPointLink'

import { VerifyLinksJobName } from 'server/worker/tasks/verifyLinks/jobNames'

export type VerifyNationalDataPointLinksJobProps = {
  assessment: Assessment
  countryIso: CountryIso
  cycle: Cycle
  notifyClients?: boolean
  targets: Array<NDPLinkTarget>
}

export type VerifyNationalDataPointLinksJob = Job<
  VerifyNationalDataPointLinksJobProps,
  void,
  typeof VerifyLinksJobName.verifyNationalDataPointLinks
>
