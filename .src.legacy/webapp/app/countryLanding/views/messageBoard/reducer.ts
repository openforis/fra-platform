import * as R from 'ramda'

import { applyReducerFunction } from '@webapp/utils/reduxUtils'
import {
  countryMessageBoardOpen,
  countryMessageBoardClose,
  countryMessageBoardOpenMessageSent,
  countryMessageBoardAllMessagesLoad,
  countryMessageBoardNewMessagesLoad,
} from './actions'

const actionHandlers = {
  [countryMessageBoardOpen]: (state: any, action: any) => R.pipe(R.assoc('show', true), R.assoc('messages', []))(state),

  [countryMessageBoardClose]: (state: any, action: any) => R.dissoc('show')(state),

  [countryMessageBoardOpenMessageSent]: (state: any, action: any) =>
    R.assoc('messages', R.append(action.message, state.messages))(state),

  [countryMessageBoardAllMessagesLoad]: (state: any, action: any) => R.assoc('messages', action.messages)(state),

  [countryMessageBoardNewMessagesLoad]: (state: any, action: any) =>
    R.assoc('messages', R.concat(state.messages, action.messages))(state),
}

export default (state = {}, action: any) => applyReducerFunction(actionHandlers, state, action)
