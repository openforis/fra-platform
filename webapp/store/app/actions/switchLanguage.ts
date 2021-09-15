import * as UserState from '@webapp/store/user/state'
import axios from 'axios'
import { createI18nPromise } from '@common/i18n/i18nFactory'
import { applicationError } from '@webapp/components/error/actions'
import { AppActions } from '@webapp/store'

export const switchLanguage = (lang: any) => async (dispatch: any, getState: any) => {
  try {
    const userInfo = UserState.getUserInfo(getState())
    if (userInfo) {
      await axios.post(`/api/user/lang?lang=${lang}`)
    }
    const i18n = await createI18nPromise(lang)

    if (lang === 'ar') document.body.classList.add('rtl')
    if (lang !== 'ar') document.body.classList.remove('rtl')

    dispatch(AppActions.updateI18n(i18n))
  } catch (err) {
    dispatch(applicationError(err))
  }
}
