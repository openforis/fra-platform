import axios from 'axios'
import { applicationError } from '../applicationError/actions'

export const loginSuccess = 'login/success'
export const loginFailure = 'login/failure'

export const requestLogin = (email) => dispatch => {
  axios.post(`/api/login/${email}`)
    .then(resp => {
      if (resp.data.loginStatus === 'ok') {
        dispatch({type: loginSuccess, userInfo: resp.data.userInfo})
        window.location = `#/country/ITA`
      } else {
        dispatch({type: loginFailure})
      }
    }).catch((err) => {
      dispatch(applicationError(err))
    })
}
