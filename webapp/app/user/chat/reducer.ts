// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'ramd... Remove this comment to see the full error message
import * as R from 'ramda'

import { applyReducerFunction } from '@webapp/utils/reduxUtils'
import { userChatLoaded, userChatClose, userChatMessageSent, userChatNewMessagesLoaded } from './actions'

const actionHandlers = {
  [userChatLoaded]: (state: any, action: any) => ({ ...state, chat: action.chat }),
  [userChatClose]: (state: any, action: any) => R.dissoc('chat', state),
  [userChatMessageSent]: (state: any, action: any) => {
    const messages = R.pipe(R.path(['chat', 'messages']), R.append(action.message))(state)

    return R.assocPath(['chat', 'messages'], messages, state)
  },
  [userChatNewMessagesLoaded]: (state: any, action: any) =>
    R.assocPath(['chat', 'messages'], R.concat(state.chat.messages, action.messages))(state),
}

export default (state = {}, action: any) => applyReducerFunction(actionHandlers, state, action)
