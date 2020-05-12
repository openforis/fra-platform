import * as R from 'ramda'

import { applyReducerFunction } from '@webapp/utils/reduxUtils'
import { userChatLoaded, userChatClose, userChatMessageSent, userChatNewMessagesLoaded } from './actions'

const actionHandlers = {
  [userChatLoaded]: (state, action) => ({...state, chat: action.chat}),
  [userChatClose]: (state, action) => R.dissoc('chat', state),
  [userChatMessageSent]: (state, action) => {
    const messages = R.pipe(
      R.path(['chat', 'messages']),
      R.append(action.message)
    )(state)

    return R.assocPath(['chat', 'messages'], messages, state)
  },
  [userChatNewMessagesLoaded]: (state, action) =>
    R.assocPath(['chat', 'messages'], R.concat(state.chat.messages, action.messages))(state)
}

export default (state = {}, action) => applyReducerFunction(actionHandlers, state, action)
