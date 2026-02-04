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

export type LinksCountryKey = CountryIso | '__global__'

export type LinksVerificationData = {
  isVerificationInProgress?: boolean
  verificationSummary?: LinksVerificationSummaryState
}

export type LinksState = Record<AssessmentName, Record<CycleName, Record<LinksCountryKey, LinksVerificationData>>>

export const initialState: LinksState = {}

export const getLinksVerificationKey = (countryIso?: CountryIso): LinksCountryKey => countryIso ?? '__global__'
