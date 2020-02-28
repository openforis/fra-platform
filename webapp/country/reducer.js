import { applyReducerFunction } from '@webapp/utils/reduxUtils'

import {
  listCountries,
  fetchCountryOverviewStatusCompleted,
  countryConfig,
  changeCountryConfigSetting, countryAssessmentLockChange
} from './actions'

import * as CountryState from '@webapp/country/countryState'

const actionHandlers = {
  [listCountries]: (state, { countries }) => CountryState.assocCountries(countries)(state),

  [fetchCountryOverviewStatusCompleted]: (state, { status }) => CountryState.assocStatus(status)(state),

  [countryConfig]: (state, { config }) => CountryState.assocConfig(config)(state),

  [changeCountryConfigSetting]: (state, { key, value }) => CountryState.assocConfig(
    { ...state.config, [key]: value }
  )(state),

  [countryAssessmentLockChange]: (state, { assessmentName, locked }) =>
    CountryState.assocStatusAssessmentsNameLocked(assessmentName, locked)(state)
}

export default (state = {}, action) => applyReducerFunction(actionHandlers, state, action)
