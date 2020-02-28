import { applyReducerFunction } from '@webapp/utils/reduxUtils'

import * as CountryState from '@webapp/country/countryState'

import {
  listCountries,
  fetchCountryOverviewStatusCompleted,
  countryConfig,
  changeCountryConfigSetting,
  countryAssessmentLockChange,
  countryAssessmentStatusChanging
} from './actions'

const actionHandlers = {
  [listCountries]: (state, { countries }) => CountryState.assocCountries(countries)(state),

  [fetchCountryOverviewStatusCompleted]: (state, { status }) => CountryState.assocStatus(status)(state),

  [countryConfig]: (state, { config }) => CountryState.assocConfig(config)(state),

  [changeCountryConfigSetting]: (state, { key, value }) => CountryState.assocConfig(
    { ...state.config, [key]: value }
  )(state),

  //====== assessment actions
  [countryAssessmentLockChange]: (state, { assessmentName, locked }) =>
    CountryState.assocStatusAssessmentLocked(assessmentName, locked)(state),

  [countryAssessmentStatusChanging]: (state, { assessmentName }) =>
    CountryState.assocStatusAssessmentChanging(assessmentName)(state)

}

export default (state = {}, action) => applyReducerFunction(actionHandlers, state, action)
