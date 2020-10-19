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

  [listRegions]: (state, { regions }) => CountryState.assocRegions(regions)(state),

  [fetchCountryOverviewStatusCompleted]: (state, { status }) => CountryState.assocStatus(status)(state),

  [countryConfig]: (state, { config }) => CountryState.assocConfig(config)(state),

  [changeCountryConfigSetting]: (state, { key, value }) =>
    CountryState.assocConfig({ ...state.config, [key]: value })(state),

  // ====== assessment actions
  [countryAssessmentStatusChanging]: (state, { assessmentName }) =>
    CountryState.assocStatusAssessmentChanging(assessmentName)(state),
}

export default (state = {}, action) => applyReducerFunction(actionHandlers, state, action)
