import axios from 'axios'

import * as UserState from '@webapp/user/userState'
import { applicationError } from '@webapp/components/error/actions'
import { createI18nPromise } from '@common/i18n/i18nFactory'

import { getRequestParam } from '@webapp/utils/urlUtils'

export const appCountryIsoUpdate = 'app/countryIso/update'
export const appInitDone = 'app/init/done'
export const appI18nUpdate = 'app/i18n/update'

export const initApp = () => async (dispatch) => {
  const lang = getRequestParam('lang')

  try {
    const {
      data: { userInfo = null },
    } = await axios.get(`/api/loggedInUser/`)
    const i18n = await createI18nPromise(lang || userInfo ? userInfo.lang : 'en')
    dispatch({ type: appInitDone, userInfo, i18n })
  } catch (err) {
    // 401 (Unauthorized) | Display error if any other status
    if (err.response && err.response.status !== 401) {
      dispatch(applicationError(err))
    }
    dispatch({ type: appInitDone, i18n: await createI18nPromise(lang || 'en') })
  }
}

export const switchLanguage = (lang) => async (dispatch, getState) => {
  try {
    const userInfo = UserState.getUserInfo(getState())
    if (userInfo) {
      await axios.post(`/api/user/lang?lang=${lang}`)
    }
    const i18n = await createI18nPromise(lang)
    dispatch({ type: appI18nUpdate, i18n })
  } catch (err) {
    dispatch(applicationError(err))
  }
}
