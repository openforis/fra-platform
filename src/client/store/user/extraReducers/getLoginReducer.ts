import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { LoginActions } from 'client/store/login/actions'
import { UserState } from 'client/store/user/stateType'

export const getLoginReducer = (builder: ActionReducerMapBuilder<UserState>) => {
  builder.addCase(LoginActions.localLogin.fulfilled, (_, { payload }) => payload)
  builder.addCase(LoginActions.acceptInvitation.fulfilled, (_, { payload }) => payload)
}
