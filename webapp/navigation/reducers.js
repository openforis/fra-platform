import { applyReducerFunction } from '../utils/reduxUtils'
import { listCountries, fetchCountryOverviewStatusCompleted } from './actions'

const actionHandlers = {
  [listCountries]: (state, action) => ({...state, countries: action.countries}),
  [fetchCountryOverviewStatusCompleted]: (state, action) => ({...state, status: action.status})
}

export default (state = {}, action) => applyReducerFunction(actionHandlers, state, action)
