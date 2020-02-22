import axios from 'axios'

import { applicationError } from '@webapp/loggedin/applicationError/actions'

export const appUserLogout = 'app/user/logout'

export const logout = () => dispatch => {
  axios.post(`/auth/logout`)
    .then(() => {
      dispatch({ type: appUserLogout })
      window.location = '/'
    })
    .catch((err) => {
      dispatch(applicationError(err))
    })
}

