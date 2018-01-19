import { applyReducerFunction } from '../utils/reduxUtils'
import { countryLatLngBoundsLoaded } from './actions'

const actionHandlers = {
  [countryLatLngBoundsLoaded]: (state, action) => ({...state, countryLatLngBounds: action.countryLatLngBounds})
}

export default (state = {}, action) => applyReducerFunction(actionHandlers, state, action)
