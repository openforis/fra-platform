import axios from 'axios'
import { applicationError } from '../applicationError/actions'

export const loginSuccess = 'login/success'
export const loginFailure = 'login/failure'
export const userInfo = 'login/userInfo'

export const requestLogin = (email) => dispatch => {
  axios.post(`/api/login/${email}`)
    .then(resp => {
      if (resp.data.loginStatus === 'ok') {
        dispatch({type: loginSuccess})
        window.location = `#/country/ITA`
      } else {
        dispatch({type: loginFailure})
      }
    }).catch((err) => {
      dispatch(applicationError(err))
    })
}

export const getLoggedinUserInfo = () => dispatch => {
  console.log("getLoggedInUserInfo")
  axios.get(`/api/loggedInUser/`)
    .then(resp => {
      dispatch({type: userInfo, userInfo: resp.data.userInfo})
    }).catch((err) => {
      dispatch(applicationError(err))
    })
}
