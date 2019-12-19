import axios from 'axios'

import { applicationError } from '../applicationError/actions'
import { createI18nInstance } from '../../common/i18n/i18nFactory'
import { getRequestParam } from '../utils/urlUtils'

export const appUserLogout = 'app/user/logout'

export const userLoggedInUserLoaded = 'user/loggedInUser/loaded'
export const userLoggedInUserSwitchLanguage = 'user/loggedInUser/switchLanguage'

// logged in user action creators

export const getLoggedinUserInfo = () => dispatch => {

  const lang = getRequestParam('lang')

  axios.get(`/api/loggedInUser/`)
    .then(resp => {
      const userInfo = resp.data.userInfo
      createI18nInstance(
        lang || userInfo.lang,
        i18n => dispatch({ type: userLoggedInUserLoaded, userInfo, i18n })
      )
    })
    .catch((err) => {
      dispatch(applicationError(err))
    })
}

export const switchLanguage = lang => dispatch => {
  axios
    .post(`/api/user/lang?lang=${lang}`)
    .catch(err => dispatch(applicationError(err)))

  createI18nInstance(
    lang,
    i18n => dispatch({ type: userLoggedInUserSwitchLanguage, i18n })
  )
}

export const logout = () => dispatch => {
  axios.post(`/auth/logout`)
    .then(() => {
      dispatch({ type: appUserLogout })
      window.location = '/login/'
    })
    .catch((err) => {
      dispatch(applicationError(err))
    })
}

