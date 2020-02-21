import axios from 'axios'

import { applicationError } from '@webapp/loggedin/applicationError/actions'
import { createI18nInstance, createI18nPromise } from '@common/i18n/i18nFactory'
import { getRequestParam } from '@webapp/utils/urlUtils'

export const appUserLogout = 'app/user/logout'

export const userInitDone = 'user/init/done'
export const userLoggedInUserLoaded = 'user/loggedInUser/loaded'
export const userLoggedInUserSwitchLanguage = 'user/loggedInUser/switchLanguage'

// logged in user action creators

export const getLoggedinUserInfo = () => async dispatch => {
  try {
    const lang = getRequestParam('lang')
    const { data } = await axios.get(`/api/loggedInUser/`)
    const { userInfo } = data
    const i18n = await createI18nPromise(lang || userInfo ? userInfo.lang : 'en')
    await dispatch({ type: userLoggedInUserLoaded, userInfo, i18n })
    dispatch({ type: userInitDone })
  } catch (err) {
    // 401 (Unauthorized) | Display error if any other status
    if (err.response && err.response.status !== 401) {
      dispatch(applicationError(err))
    }
    dispatch({ type: userInitDone })
  }
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
      window.location = '/'
    })
    .catch((err) => {
      dispatch(applicationError(err))
    })
}

