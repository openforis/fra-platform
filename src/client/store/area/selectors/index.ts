import { createSelector } from '@reduxjs/toolkit'

import { Country, CountryIso } from 'meta/area'
import { AssessmentName, CycleName } from 'meta/assessment'

import { RootState } from 'client/store/RootState'

const getCountries = createSelector(
  [
    (state: RootState) => state.area.countries,
    (_state: RootState, assessmentName: AssessmentName) => assessmentName,
    (_state: RootState, _assessmentName: AssessmentName, cycleName: CycleName) => cycleName,
  ],
  (countries, assessmentName: AssessmentName, cycleName: CycleName) => {
    return countries[assessmentName]?.[cycleName] ?? ({} as Record<CountryIso, Country>)
  }
)

const getCountry = createSelector(
  [
    getCountries,
    (_state: RootState, _assessmentName: AssessmentName, _cycleName: CycleName, countryIso: CountryIso) => countryIso,
  ],
  (countries, countryIso: CountryIso) => {
    return countries[countryIso]
  }
)

const getRegionGroups = createSelector(
  [
    (state: RootState) => state.area.regionGroups,
    (_state: RootState, assessmentName: AssessmentName) => assessmentName,
    (_state: RootState, _assessmentName: AssessmentName, cycleName: CycleName) => cycleName,
  ],
  (regionGroups, assessmentName, cycleName: CycleName) => {
    return regionGroups[assessmentName]?.[cycleName] ?? {}
  }
)

export const AreaSelectors = {
  getCountries,
  getCountry,
  getRegionGroups,
}
