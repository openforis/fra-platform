import { acceptInvitation } from 'client/store/login/actions/acceptInvitation'
import { fetchUserByInvitation } from 'client/store/login/actions/fetchUserByInvitation'
import { initLogin } from 'client/store/login/actions/initLogin'
import { localLogin } from 'client/store/login/actions/localLogin'
import { LoginSlice } from 'client/store/login/slice'

export const LoginActions = {
  ...LoginSlice.actions,
  acceptInvitation,
  fetchUserByInvitation,
  initLogin,
  localLogin,
}
