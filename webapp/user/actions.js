import axios from 'axios'

import { applicationError } from '@webapp/loggedin/applicationError/actions'

export const appUserLogout = 'app/user/logout'

export const logout = () => async dispatch => {
  try {
    await axios.post(`/auth/logout`)
    window.location = '/'
  } catch (err) {
    dispatch(applicationError(err))
  }

}

