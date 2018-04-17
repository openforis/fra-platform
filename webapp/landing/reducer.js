import R from 'ramda'

import {  exportReducer } from '../utils/reduxUtils'
import { countryLatLngBoundsLoading, countryLatLngBoundsLoaded, countryOverviewLoaded } from './actions'
import { lastAuditFeedReceived } from '../audit/actions'

const actionHandlers = {
  [countryLatLngBoundsLoading]: (state, action) =>
    R.dissoc('countryLatLngBounds', state),

  [countryLatLngBoundsLoaded]: (state, action) =>
    ({...state, countryLatLngBounds: action.countryLatLngBounds}),

  [countryOverviewLoaded]: (state, action) =>
    ({...state, overview: action.overview}),

  [lastAuditFeedReceived]: (state, action) =>
    ({...state, feed: action.feed})

}

export default exportReducer(actionHandlers)
