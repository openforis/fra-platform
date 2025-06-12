import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { reset } from 'client/store/messageCenter/actions/reset'
import { initialState, MessageCenterState } from 'client/store/messageCenter/state'

export const resetReducer = (builder: ActionReducerMapBuilder<MessageCenterState>) => {
  builder.addCase(reset, () => initialState)
}
