import { applyReducerFunction } from '../utils/reduxUtils'
import { listCountries, fetchNavStatusCompleted } from './actions'
import { issuePostCommentCompleted } from '../review/actions'

const actionHandlers = {
  [listCountries]: (state, action) => ({...state, countries: action.countries}),
  [issuePostCommentCompleted]: state => ({...state, updateNeeded: true}),
  [fetchNavStatusCompleted]: (state, action) => ({...state, status: action.status, updateNeeded: false})
}

export default (state = {}, action) => applyReducerFunction(actionHandlers, state, action)
