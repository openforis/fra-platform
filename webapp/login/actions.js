import axios from 'axios'
import { applicationError } from '../applicationError/actions'

export const loginSuccess = 'login/success'

export const requestLogin = (email) => dispatch => {
  axios.post(`/api/login/${email}`)
    .then(resp => {
      if (resp.data.loginStatus === 'ok') {
        dispatch({type: loginSuccess, userInfo: resp.data.userInfo})
        window.location = `#/country/ITA`
      }
    }).catch((err) => {
      dispatch(applicationError(err))
    })
}
