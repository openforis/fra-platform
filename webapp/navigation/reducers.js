import { applyReducerFunction } from '../utils/reduxUtils'
import { listCountries, fetchCountryOverviewStatus } from './actions'

const actionHandlers = {
  [listCountries]: (state, action) => ({...state, countries: action.countries}),
  [fetchCountryOverviewStatus]: (state, action) => ({...state, status: action.status})
}

export default (state = {}, action) => applyReducerFunction(actionHandlers, state, action)
