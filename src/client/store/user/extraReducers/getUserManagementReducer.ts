import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { UserManagementActions } from 'client/store/ui/userManagement'
import { UserState } from 'client/store/user/state'

export const getUserManagementReducer = (builder: ActionReducerMapBuilder<UserState>) => {
  builder.addCase(UserManagementActions.updateUser.fulfilled, (state, { payload }) =>
    payload.user.id === state.id ? { ...payload.user, roles: state.roles } : state
  )

  builder.addCase(UserManagementActions.updateRoleProps.fulfilled, (state, { meta }) => {
    const { role } = meta.arg
    const i = state.roles.findIndex((r) => r.id === role.id)
    if (i !== -1) state.roles[i] = { ...state.roles[i], ...role }
  })
}
