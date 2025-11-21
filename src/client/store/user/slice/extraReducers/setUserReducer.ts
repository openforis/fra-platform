import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { UserActions } from 'client/store/user/actions'
import { UserState } from 'client/store/user/state'

export const setUserReducer = (builder: ActionReducerMapBuilder<UserState>): void => {
  builder.addCase(UserActions.setUser, (_, action) => {
    return action.payload
  })
}
