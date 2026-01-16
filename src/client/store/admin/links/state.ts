import { CountryIso } from 'meta/area/countryIso'
import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'

export type LinksState = {
  isVerificationInProgress?: Record<AssessmentName, Record<CycleName, Record<CountryIso | '__global__', boolean>>>
}

export const initialState: LinksState = {}

export const getLinksVerificationKey = (countryIso?: CountryIso): string => countryIso ?? '__global__'
