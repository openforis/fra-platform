import R from 'ramda'
import { applyReducerFunction } from '../utils/reduxUtils'
import {
  listCountries,
  fetchCountryOverviewStatusCompleted,
  changeAssessmentStatusInitiated,
  navigationScrolled,
  toggleShowNavigation
} from './actions'

const actionHandlers = {
  [listCountries]: (state, action) => ({...state, countries: action.countries}),
  [fetchCountryOverviewStatusCompleted]: (state, action) => ({...state, status: action.status}),
  [changeAssessmentStatusInitiated]: (state, action) => (R.assocPath(['status', 'assessmentStatuses', action.assessmentType], 'changing' ,state)),
  [navigationScrolled]: (state, action) => ({...state, scrollPosition: action.position}),
  [toggleShowNavigation]: (state) => ({...state, navigationVisible: !state.navigationVisible})
}

export default (state = {navigationVisible: true}, action) => applyReducerFunction(actionHandlers, state, action)
