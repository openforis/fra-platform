import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { logout } from 'client/store/user/actions/logout'
import { initialState } from 'client/store/user/slice'
import { UserState } from 'client/store/user/stateType'

export const getLogoutReducer = (builder: ActionReducerMapBuilder<UserState>) => {
  builder.addCase(logout.fulfilled, () => initialState)
}
