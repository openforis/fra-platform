import { Country, CountryIso } from 'meta/area'
import { AssessmentName, CycleName } from 'meta/assessment'

export interface AreaState {
  countries: Record<AssessmentName, Record<CycleName, Record<CountryIso, Country>>>
  regionGroups: Record<AssessmentName, Record<CycleName, Array<Country>>>
  updatingCountry: boolean
}

export const initialState = {
  countries: {},
  regionGroups: {},
  updatingCountry: false,
}
