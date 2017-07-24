import R from 'ramda'
import { applyReducerFunction } from '../utils/reduxUtils'
import {
  listCountries,
  fetchCountryOverviewStatusCompleted,
  changeAssessmentStatusInitiated
} from './actions'

const actionHandlers = {
  [listCountries]: (state, action) => ({...state, countries: action.countries}),
  [fetchCountryOverviewStatusCompleted]: (state, action) => ({...state, status: action.status}),
  [changeAssessmentStatusInitiated]: (state, action) => (R.assocPath(['status', 'assessmentStatuses', action.assessmentType], 'changing' ,state))
}

export default (state = {}, action) => applyReducerFunction(actionHandlers, state, action)
