import axios from 'axios'
import { applicationError } from '../applicationError/actions'

export const userInfo = 'login/userInfo'

export const getLoggedinUserInfo = () => dispatch => {
  axios.get(`/api/loggedInUser/`)
    .then(resp => {
      dispatch({type: userInfo, userInfo: resp.data.userInfo})
    })
    .catch((err) => {
      dispatch(applicationError(err))
    })
}

export const logout = () => dispatch => {
  axios.post(`/auth/logout`)
    .then(() => {
      window.location.hash = ''
    })
    .catch((err) => {
      dispatch(applicationError(err))
    })
}
