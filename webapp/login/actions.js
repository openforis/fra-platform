import axios from 'axios'
import { getUrlParameter } from '@webapp/utils/urlUtils'

export const loginInitLoaded = 'login/init/loaded'
export const loginUserPropChanged = 'login/userProp/changed'

export const initLogin = () => dispatch => {
  const defaultUser = {type: 'google', email: '', password: ''}

  const invitationUUID = getUrlParameter('i')
  if (invitationUUID) {
    axios.get(`/auth/invitation/${invitationUUID}`)
      .then(res => {
        const {invitation, user} = res.data
        dispatch({
          type: loginInitLoaded,
          invitation,
          user: user ? {...user, password: ''} : {...defaultUser, email: invitation.email}
        })
      })
  } else {
    dispatch({type: loginInitLoaded, user: defaultUser})
  }
}

export const loginUserPropChange = (prop, value) => dispatch => {
  dispatch({type: loginUserPropChanged, prop, value})
}

// local login

export const localLoginResponseLoaded = 'localLogin/response/loaded'
export const localLoginResetPasswordResponseLoaded = 'localLogin/resetPassword/ResponseLoaded'

export const localLoginReset = () => dispatch =>
  dispatch({type: localLoginResponseLoaded, message: null})

export const localLoginSubmit = (user, invitationUUID) => dispatch => {

  axios.post('/auth/local/login', {invitationUUID, ...user})
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

// reset password

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
