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
    // Format regions of type
    // [{ regionIso: R, countryIso: C }, { regionIso: R, countryIso: C1 }, ... ]
    // { R: [ C, C1, ... ]
    const result = {}

    regions.forEach(({ regionCode, countryIso }) => {
      if (!result[regionCode]) {
        result[regionCode] = []
      }

      result[regionCode].push(countryIso)
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
