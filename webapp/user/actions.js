import axios from 'axios'
import { applicationError } from '../applicationError/actions'
import { createI18nInstance } from '../i18n/i18nFactory'

export const userInfo = 'login/userInfo'
export const switchLanguageAction = 'user/switchLanguage'

export const getLoggedinUserInfo = () => dispatch => {
  axios.get(`/api/loggedInUser/`)
    .then(resp => {
      createI18nInstance(
        resp.data.userInfo.lang,
        i18n => dispatch({type: userInfo, userInfo: resp.data.userInfo, i18n})
      )
    })
    .catch((err) => {
      dispatch(applicationError(err))
    })
}

export const switchLanguage = lang => dispatch => {
  createI18nInstance(
    lang,
    i18n => dispatch({type: switchLanguageAction, i18n})
  )
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
