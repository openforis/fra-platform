import { applyReducerFunction } from '../utils/reduxUtils'
import { countryLatLngBoundsLoaded, countryOverviewLoaded } from './actions'

const actionHandlers = {
  [countryLatLngBoundsLoaded]: (state, action) => ({...state, countryLatLngBounds: action.countryLatLngBounds}),
  [countryOverviewLoaded]: (state, action) => ({...state, overview: action.overview})
}

export default (state = {}, action) => applyReducerFunction(actionHandlers, state, action)
