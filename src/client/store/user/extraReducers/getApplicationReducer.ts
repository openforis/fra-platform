import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { ApplicationActions } from 'client/store/application/actions'
import { UserState } from 'client/store/user/stateType'

export const getApplicationReducer = (builder: ActionReducerMapBuilder<UserState>) => {
  builder.addCase(ApplicationActions.initApp.fulfilled, (_, { payload }) => payload.user)
}
