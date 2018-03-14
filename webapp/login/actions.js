import axios from 'axios'

export const localLoginResponseLoaded = 'localLogin/response/loaded'
export const localLoginResetPasswordResponseLoaded = 'localLogin/resetPassword/ResponseLoaded'

export const localLoginReset = () => dispatch =>
  dispatch({type: localLoginResponseLoaded, message: null})

export const localLoginSubmit = (user, invitationUUID) => dispatch => {

  axios.post('/auth/local/login', {email: 'hackPassport', invitationUUID, ...user})
    .then(resp => {
      const data = resp.data
      if (data.redirectUrl) {
        window.location = data.redirectUrl
      } else if (data.message) {
        dispatch({type: localLoginResponseLoaded, message: data.message})
      }
    }).catch(error => dispatch({type: localLoginResponseLoaded, message: error}))

}

export const resetPasswordFormReset = () => dispatch =>
  dispatch({type: localLoginResetPasswordResponseLoaded, message: null, error: null})

export const resetPassword = email => dispatch => {

  axios.post('/auth/local/resetPassword', {email})
    .then(resp => {
      const data = resp.data

      dispatch({type: localLoginResetPasswordResponseLoaded, ...data})
    })
    .catch(error => dispatch({type: localLoginResetPasswordResponseLoaded, message: error}))

}

export const resetPasswordLoaded = 'resetPassword/loaded'
export const changePasswordResponseLoaded = 'changePassword/response/loaded'

export const findResetPassword = uuid => dispatch => {
  axios.get(`/auth/local/resetPassword/${uuid}`)
    .then(resp => {
      dispatch({type: resetPasswordLoaded, status: 'loaded', resetPassword: resp.data})
    })
    .catch(error => dispatch({type: resetPasswordLoaded, status: 'error'}))
}

export const changePassword = (uuid, userId, password, password2) => dispatch => {
  axios.post(`/auth/local/changePassword`, {uuid, userId, password, password2})
    .then(resp => {
      const {message, error} = resp.data
      dispatch({type: changePasswordResponseLoaded, message, error})
    })
    .catch(error => dispatch({type: changePasswordResponseLoaded, error}))
}
