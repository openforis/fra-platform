import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { ApplicationActions } from 'client/store/application/actions'
import { UserState } from 'client/store/user/state'

export const getApplicationReducer = (builder: ActionReducerMapBuilder<UserState>) => {
  builder.addCase(ApplicationActions.initApp.fulfilled, (_, { payload }) => payload.user)
}
