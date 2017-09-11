import R from 'ramda'
import {format} from 'date-fns'
import { applyReducerFunction } from '../utils/reduxUtils'
import {
  listCountries,
  fetchCountryOverviewStatusCompleted,
  changeAssessmentStatusInitiated,
  navigationScrolled,
  sectionUpdate
} from './actions'

const actionHandlers = {
  [listCountries]: (state, action) => ({...state, countries: action.countries}),
  [fetchCountryOverviewStatusCompleted]: (state, action) => ({...state, status: action.status}),
  [changeAssessmentStatusInitiated]: (state, action) => (R.assocPath(['status', 'assessmentStatuses', action.assessmentType], 'changing' ,state)),
  [navigationScrolled]: (state, action) => ({...state, scrollPosition: action.position}),
  [sectionUpdate]: (state, action) => R.assocPath(['status', 'auditSummary', action.section], format(Date.now()),  state)
}

export default (state = {}, action) => applyReducerFunction(actionHandlers, state, action)
