import { applyReducerFunction } from '@webapp/utils/reduxUtils'

import * as CountryState from '@webapp/app/country/countryState'

import {
  fetchCountryOverviewStatusCompleted,
  countryConfig,
  changeCountryConfigSetting,
  countryAssessmentStatusChanging,
} from './actions'

const actionHandlers = {
  [fetchCountryOverviewStatusCompleted]: (state: any, { status }: any) => CountryState.assocStatus(status)(state),

  [countryConfig]: (state: any, { config }: any) => CountryState.assocConfig(config)(state),

  [changeCountryConfigSetting]: (state: any, { key, value }: any) =>
    CountryState.assocConfig({ ...state.config, [key]: value })(state),

  // ====== assessment actions
  [countryAssessmentStatusChanging]: (state: any, { assessmentName }: any) =>
    CountryState.assocStatusAssessmentChanging(assessmentName)(state),
}

export default (state = {}, action: any) => applyReducerFunction(actionHandlers, state, action)
