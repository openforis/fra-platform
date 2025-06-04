import { logout } from 'client/store/user/actions/logout'
import { userSlice } from 'client/store/user/slice'

export const UserActions = {
  ...userSlice.actions,
  logout,
}
