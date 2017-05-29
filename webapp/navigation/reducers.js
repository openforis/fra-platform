import { applyReducerFunction } from '../utils/reduxUtils'
import { listCountries } from './actions'

const actionHandlers = {
  [listCountries]: (state, action) => {
    return {...state, countries: action.countries}
  }
}

export default (state = {}, action) => applyReducerFunction(actionHandlers, state, action)
