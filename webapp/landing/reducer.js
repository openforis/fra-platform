import * as R from 'ramda'

import { exportReducer } from '../utils/reduxUtils'
import {
  countryLatLngBoundsLoading,
  countryLatLngBoundsLoaded,
  countryOverviewLoaded,
  fileRepositoryFilesListLoad
} from './actions'
import { lastAuditFeedReceived } from '../audit/actions'
import { countryMessageBoardAllMessagesLoad } from '../countryMessageBoard/actions'

const actionHandlers = {
  [countryLatLngBoundsLoading]: (state, action) =>
    R.dissoc('countryLatLngBounds', state),

  [countryLatLngBoundsLoaded]: (state, action) =>
    ({...state, countryLatLngBounds: action.countryLatLngBounds}),

  [countryOverviewLoaded]: (state, action) =>
    ({...state, overview: action.overview}),

  [countryMessageBoardAllMessagesLoad]: (state, action) =>
    R.assocPath(['overview', 'countryMessageBoardUnreadMessages'], 0)(state),

  [lastAuditFeedReceived]: (state, action) =>
    ({...state, feed: action.feed}),

  [fileRepositoryFilesListLoad]: (state, action) =>
    R.assocPath(['repository', 'filesList'], action.filesList, state)

}

export default exportReducer(actionHandlers)
