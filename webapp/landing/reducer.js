import R from 'ramda'
import { applyReducerFunction } from '../utils/reduxUtils'
import { countryLatLngBoundsLoading, countryLatLngBoundsLoaded, countryOverviewLoaded } from './actions'

const actionHandlers = {
  [countryLatLngBoundsLoading]: (state, action) => R.dissoc('countryLatLngBounds', state),
  [countryLatLngBoundsLoaded]: (state, action) => ({...state, countryLatLngBounds: action.countryLatLngBounds}),
  [countryOverviewLoaded]: (state, action) => ({...state, overview: action.overview})
}

export default (state = {}, action) => applyReducerFunction(actionHandlers, state, action)
