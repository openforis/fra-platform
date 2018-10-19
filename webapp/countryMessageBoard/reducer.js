import * as R from 'ramda'

import { applyReducerFunction } from '../utils/reduxUtils'
import {
  countryMessageBoardOpen,
  countryMessageBoardClose
} from './actions'

const actionHandlers = {

  [countryMessageBoardOpen]: (state, action) => R.pipe(
    R.assoc('show', true),
    R.assoc('messages', []),
  )(state),

  [countryMessageBoardClose]: (state, action) => R.dissoc('show')(state),
  // [userChatLoaded]: (state, action) => ({...state, chat: action.chat}),
  // [userChatClose]: (state, action) => R.dissoc('chat', state),
  // [userChatMessageSent]: (state, action) => {
  //   const messages = R.pipe(
  //     R.path(['chat', 'messages']),
  //     R.append(action.message)
  //   )(state)
  //
  //   return R.assocPath(['chat', 'messages'], messages, state)
  // }
}

export default (state = {}, action) => applyReducerFunction(actionHandlers, state, action)
