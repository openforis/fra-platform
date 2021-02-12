import * as R from 'ramda'

import { exportReducer } from '@webapp/utils/reduxUtils'
import { lastAuditFeedReceived } from '@webapp/app/components/audit/actions'
import { countryMessageBoardAllMessagesLoad } from '@webapp/app/countryLanding/views/messageBoard/actions'

import { countryOverviewLoaded, fileRepositoryFilesListLoad } from './actions'
import * as LandingState from './landingState'

const actionHandlers = {
  [countryOverviewLoaded]: (state: any, { overview: { users, countryMessageBoardUnreadMessages } }: any) =>
    R.pipe(
      LandingState.assocUsers(users),
      LandingState.assocCountryMessageBoardUnreadMessages(countryMessageBoardUnreadMessages)
    )(state),

  [countryMessageBoardAllMessagesLoad]: (state: any, _: any) =>
    LandingState.assocCountryMessageBoardUnreadMessages(0)(state),

  [lastAuditFeedReceived]: (state: any, action: any) => ({ ...state, feed: action.feed }),

  [fileRepositoryFilesListLoad]: (state: any, action: any) =>
    R.assocPath(['repository', 'filesList'], action.filesList, state),
}

export default exportReducer(actionHandlers)
