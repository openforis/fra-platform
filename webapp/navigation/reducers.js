import { applyReducerFunction } from '../utils/reduxUtils'
import { listCountries } from './actions'

const actionHandlers = {
  [listCountries]: (state, action) => {
    return {countries: action.countries, ...state}
  }
}

export default (state = {}, action) => applyReducerFunction(actionHandlers, state, action)
