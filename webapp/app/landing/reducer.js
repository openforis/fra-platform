import * as R from 'ramda'

import { exportReducer } from '@webapp/utils/reduxUtils'
import { lastAuditFeedReceived } from '@webapp/app/components/audit/actions'
import { countryMessageBoardAllMessagesLoad } from '@webapp/app/landing/views/messageBoard/actions'

import { countryOverviewLoaded, fileRepositoryFilesListLoad } from './actions'
import * as LandingState from './landingState'

const actionHandlers = {
  [countryOverviewLoaded]: (state, { overview: { users, countryMessageBoardUnreadMessages } }) =>
    R.pipe(
      LandingState.assocUsers(users),
      LandingState.assocCountryMessageBoardUnreadMessages(countryMessageBoardUnreadMessages)
    )(state),

  [countryMessageBoardAllMessagesLoad]: (state, _) => LandingState.assocCountryMessageBoardUnreadMessages(0)(state),

  [lastAuditFeedReceived]: (state, action) => ({ ...state, feed: action.feed }),

  [fileRepositoryFilesListLoad]: (state, action) => R.assocPath(['repository', 'filesList'], action.filesList, state),
}

export default exportReducer(actionHandlers)
