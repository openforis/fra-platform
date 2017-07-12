import { applyReducerFunction } from '../utils/reduxUtils'
import { listCountries, fetchNavStatusCompleted } from './actions'
import { issuePostCommentCompleted } from '../review/actions'
import { odpClearActiveAction } from '../originalDataPoint/actions'

const actionHandlers = {
  [listCountries]: (state, action) => ({...state, countries: action.countries}),
  [issuePostCommentCompleted]: state => ({...state, updateNeeded: true}),
  [fetchNavStatusCompleted]: (state, action) => ({...state, status: action.status, updateNeeded: false}),
  [odpClearActiveAction]: state => ({...state, updateNeeded: true})
}

export default (state = {}, action) => applyReducerFunction(actionHandlers, state, action)
