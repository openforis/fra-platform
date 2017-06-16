import { applyReducerFunction } from '../utils/reduxUtils'
import { listCountries, fetchNavStatusCompleted } from './actions'

const actionHandlers = {
  [listCountries]: (state, action) => {
    return {...state, countries: action.countries}
  },
  [fetchNavStatusCompleted]: (state, action) => {
    return {...state, status: action.status}
  }
}

export default (state = {}, action) => applyReducerFunction(actionHandlers, state, action)
