import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { LoginActions } from 'client/store/login/actions'
import { UserState } from 'client/store/user/state'

export const getLoginReducer = (builder: ActionReducerMapBuilder<UserState>): void => {
  builder.addCase(LoginActions.localLogin.fulfilled, (_, { payload }) => payload)
  builder.addCase(LoginActions.acceptInvitation.fulfilled, (_, { payload }) => payload)
}
