import * as R from 'ramda'

import { exportReducer } from '@webapp/utils/reduxUtils'
import { countryOverviewLoaded, fileRepositoryFilesListLoad } from './actions'
import { lastAuditFeedReceived } from '../audit/actions'
import { countryMessageBoardAllMessagesLoad } from '@webapp/loggedin/countryMessageBoard/actions'

const actionHandlers = {

  [countryOverviewLoaded]: (state, action) =>
    ({ ...state, overview: action.overview }),

  [countryMessageBoardAllMessagesLoad]: (state, action) =>
    R.assocPath(['overview', 'countryMessageBoardUnreadMessages'], 0)(state),

  [lastAuditFeedReceived]: (state, action) =>
    ({ ...state, feed: action.feed }),

  [fileRepositoryFilesListLoad]: (state, action) =>
    R.assocPath(['repository', 'filesList'], action.filesList, state)

}

export default exportReducer(actionHandlers)
