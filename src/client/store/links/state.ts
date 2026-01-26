import { CountryIso } from 'meta/area/countryIso'
import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'
import { LinksVerificationSummary } from 'meta/cycleData/links/link'

export enum LinksVerificationSummaryStatus {
  failed = 'failed',
  loading = 'loading',
  ready = 'ready',
}

export type LinksVerificationSummaryState = {
  status?: LinksVerificationSummaryStatus
  summary?: LinksVerificationSummary
}

export type LinksState = {
  isVerificationInProgress?: Record<AssessmentName, Record<CycleName, Record<CountryIso | '__global__', boolean>>>
  verificationSummary?: Record<
    AssessmentName,
    Record<CycleName, Record<CountryIso | '__global__', LinksVerificationSummaryState>>
  >
}

export const initialState: LinksState = {}

export const getLinksVerificationKey = (countryIso?: CountryIso): string => countryIso ?? '__global__'
