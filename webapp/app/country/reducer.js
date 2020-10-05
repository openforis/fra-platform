import { applyReducerFunction } from '@webapp/utils/reduxUtils'

import * as CountryState from '@webapp/app/country/countryState'

import {
  listCountries,
  listRegions,
  fetchCountryOverviewStatusCompleted,
  countryConfig,
  changeCountryConfigSetting,
  countryAssessmentStatusChanging,
} from './actions'

const actionHandlers = {
  [listCountries]: (state, { countries }) => CountryState.assocCountries(countries)(state),

  [listRegions]: (state, { regions }) => {
    // Create 2 sub maps with either [countryIso] or [regionCode] keys
    const result = {
      countryRegions: {},
      regionCountries: {},
    }
    regions.forEach(({ regionCode, countryIso }) => {
      if (!result.regionCountries[regionCode]) {
        result.regionCountries[regionCode] = []
      }
      if (!result.countryRegions[countryIso]) {
        result.countryRegions[countryIso] = []
      }

      result.regionCountries[regionCode].push(countryIso)
      result.countryRegions[countryIso].push(regionCode)
    })
    return CountryState.assocRegions(result)(state)
  },

  [fetchCountryOverviewStatusCompleted]: (state, { status }) => CountryState.assocStatus(status)(state),

  [countryConfig]: (state, { config }) => CountryState.assocConfig(config)(state),

  [changeCountryConfigSetting]: (state, { key, value }) =>
    CountryState.assocConfig({ ...state.config, [key]: value })(state),

  // ====== assessment actions
  [countryAssessmentStatusChanging]: (state, { assessmentName }) =>
    CountryState.assocStatusAssessmentChanging(assessmentName)(state),
}

export default (state = {}, action) => applyReducerFunction(actionHandlers, state, action)
