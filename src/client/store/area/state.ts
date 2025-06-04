import { Country, CountryIso } from 'meta/area'
import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'

export interface AreaState {
  countries: Record<AssessmentName, Record<CycleName, Record<CountryIso, Country>>>
  regionGroups: Record<AssessmentName, Record<CycleName, Array<Country>>>
  updatingCountry: boolean
}

export const initialState: AreaState = {
  countries: {},
  regionGroups: {},
  updatingCountry: false,
}
