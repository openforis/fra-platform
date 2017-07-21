import { applyReducerFunction } from '../utils/reduxUtils'
import { listCountries, fetchNavStatusCompleted } from './actions'

const actionHandlers = {
  [listCountries]: (state, action) => ({...state, countries: action.countries}),
  [fetchNavStatusCompleted]: (state, action) => ({...state, status: action.status})
}

export default (state = {}, action) => applyReducerFunction(actionHandlers, state, action)
