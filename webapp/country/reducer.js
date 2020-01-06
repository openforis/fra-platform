import { applyReducerFunction } from '@webapp/utils/reduxUtils'
import * as R from 'ramda'

import {
  listCountries,
  fetchCountryOverviewStatusCompleted,
  countryConfig,
  changeCountryConfigSetting
} from './actions'
import { toggleAssessmentLockChange } from '@webapp/loggedin/navigation/actions'

const actionHandlers = {
  [listCountries]: (state, action) =>
    ({...state, countries: action.countries}),

  [fetchCountryOverviewStatusCompleted]: (state, action) =>
    ({...state, status: action.status}),

  [countryConfig]: (state, action) =>
    ({...state, config: action.config}),

  [changeCountryConfigSetting]: (state, action) =>
    ({...state, config: {...state.config, [action.key]: action.value}}),

  [toggleAssessmentLockChange]: (state, action) =>
    R.assocPath(['status', 'assessments', action.assessmentName, 'locked'], action.locked)(state)
}

export default (state = {}, action) => applyReducerFunction(actionHandlers, state, action)
