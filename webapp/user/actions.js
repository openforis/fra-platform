import axios from 'axios'

import { applicationError } from '@webapp/loggedin/applicationError/actions'

export const appUserLogout = 'app/user/logout'

export const logout = history => dispatch => {
  axios.post(`/auth/logout`)
    .then(() => {
      dispatch({ type: appUserLogout })
      history.push('/')
    })
    .catch((err) => {
      dispatch(applicationError(err))
    })
}

