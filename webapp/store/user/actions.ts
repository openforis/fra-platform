import axios from 'axios'

import { applicationError } from '@webapp/components/error/actions'

export const appUserLogout = 'app/user/logout'

export const logout = () => async (dispatch: any) => {
  try {
    await axios.post(`/auth/logout`)
    window.location.href = '/'
  } catch (err) {
    dispatch(applicationError(err))
  }
}
