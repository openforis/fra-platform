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

  [countryMessageBoardOpen]: (state, action) => R.pipe(
    R.assoc('show', true),
    R.assoc('messages', []),
  )(state),

  [countryMessageBoardClose]: (state, action) => R.dissoc('show')(state),

  [countryMessageBoardOpenMessageSent]: (state, action) =>
    R.assoc('messages', R.append(action.message, state.messages))(state),

  [countryMessageBoardAllMessagesLoad]: (state, action) =>
    R.assoc('messages', action.messages)(state),

  [countryMessageBoardNewMessagesLoad]: (state, action) =>
    R.assoc('messages', R.concat(state.messages, action.messages))(state)

}

export default (state = {}, action) => applyReducerFunction(actionHandlers, state, action)
