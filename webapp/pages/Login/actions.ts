import axios from 'axios'
import { getUrlParameter } from '@webapp/utils/urlUtils'
import { ApiEndPoint } from '@common/api/endpoint'

export const loginInitLoaded = 'login/init/loaded'
export const loginUserPropChanged = 'login/userProp/changed'

export const initLogin = () => (dispatch: any) => {
  const defaultUser = { type: 'google', email: '', password: '' }

  const invitationUUID = getUrlParameter('i')
  if (invitationUUID) {
    axios.get(ApiEndPoint.Auth.getInvitation(invitationUUID)).then((res) => {
      const { invitation, user } = res.data
      dispatch({
        type: loginInitLoaded,
        invitation,
        user: user ? { ...user, password: '' } : { ...defaultUser, email: invitation.email },
      })
    })
  } else {
    dispatch({ type: loginInitLoaded, user: defaultUser })
  }
}

export const loginUserPropChange = (prop: any, value: any) => (dispatch: any) => {
  dispatch({ type: loginUserPropChanged, prop, value })
}

// local login

export const localLoginResponseLoaded = 'localLogin/response/loaded'
export const localLoginResetPasswordResponseLoaded = 'localLogin/resetPassword/ResponseLoaded'

export const localLoginReset = () => (dispatch: any) => dispatch({ type: localLoginResponseLoaded, message: null })

export const localLoginSubmit = (user: any, invitationUUID: any) => (dispatch: any) => {
  axios
    .post(ApiEndPoint.Auth.Login.local(), { invitationUUID, ...user })
    .then((resp) => {
      const { data } = resp
      if (data.redirectUrl) {
        window.location = data.redirectUrl
      } else if (data.message) {
        dispatch({ type: localLoginResponseLoaded, message: data.message })
      }
    })
    .catch((error) => dispatch({ type: localLoginResponseLoaded, message: error }))
}

export const resetPasswordFormReset = () => (dispatch: any) =>
  dispatch({ type: localLoginResetPasswordResponseLoaded, message: null, error: null })

export const resetPassword = (email: any) => (dispatch: any) => {
  axios
    .post(ApiEndPoint.Auth.ResetPassword.create(), { email })
    .then((resp) => {
      const { data } = resp

      dispatch({ type: localLoginResetPasswordResponseLoaded, ...data })
    })
    .catch((error) => dispatch({ type: localLoginResetPasswordResponseLoaded, message: error }))
}

// reset password

export const resetPasswordLoaded = 'resetPassword/loaded'
export const changePasswordResponseLoaded = 'changePassword/response/loaded'

export const findResetPassword = (uuid: any) => (dispatch: any) => {
  axios
    .get(ApiEndPoint.Auth.ResetPassword.get(uuid))
    .then((resp) => {
      dispatch({ type: resetPasswordLoaded, status: 'loaded', resetPassword: resp.data })
    })
    .catch((error) => dispatch({ type: resetPasswordLoaded, status: 'error' }))
}

export const changePassword = (uuid: any, userId: any, password: any, password2: any) => (dispatch: any) => {
  axios
    .post(ApiEndPoint.Auth.changePassword(), { uuid, userId, password, password2 })
    .then((resp) => {
      const { message, error } = resp.data
      dispatch({ type: changePasswordResponseLoaded, message, error })
    })
    .catch((error) => dispatch({ type: changePasswordResponseLoaded, error }))
}
