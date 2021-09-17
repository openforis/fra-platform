import * as UserState from '@webapp/store/user/state'
import axios from 'axios'
import { createI18nPromise } from '@common/i18n/i18nFactory'
import { applicationError } from '@webapp/components/error/actions'
import { createAsyncThunk } from '@reduxjs/toolkit'
import i18nInstance from '@common/i18n/i18nInstance'

export const switchLanguage = createAsyncThunk('app/switchLanguage', async (lang: string, { dispatch, getState }) => {
  try {
    const userInfo = UserState.getUserInfo(getState())
    if (userInfo) {
      await axios.post(`/api/user/lang?lang=${lang}`)
    }
    await i18nInstance.update(lang)

    if (lang === 'ar') document.body.classList.add('rtl')
    if (lang !== 'ar') document.body.classList.remove('rtl')

    return { language: lang }
  } catch (err) {
    dispatch(applicationError(err))
    return createI18nPromise('en')
  }
})
