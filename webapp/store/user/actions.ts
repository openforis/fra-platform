import axios from 'axios'

import { applicationError } from '@webapp/components/error/actions'
import { ApiEndPoint } from '@common/api/endpoint'

export const appUserLogout = 'app/user/logout'

export const logout = () => async (dispatch: any) => {
  try {
    await axios.post(ApiEndPoint.Auth.logout())
    window.location.href = '/'
  } catch (err) {
    dispatch(applicationError(err))
  }
}
