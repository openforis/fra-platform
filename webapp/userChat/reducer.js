import * as R from 'ramda'

import { applyReducerFunction } from '../utils/reduxUtils'
import { userChatLoaded, userChatClose } from './actions'

const actionHandlers = {
  [userChatLoaded]: (state, action) => ({...state, chat: action.chat}),
  [userChatClose]: (state, action) => R.dissoc('chat', state)
}

export default (state = {}, action) => applyReducerFunction(actionHandlers, state, action)
