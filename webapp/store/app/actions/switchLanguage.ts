import * as UserState from '@webapp/store/user/state'
import axios from 'axios'

import { applicationError } from '@webapp/components/error/actions'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const switchLanguage = createAsyncThunk(
  'app/switchLanguage',
  async (language: string, { dispatch, getState }) => {
    try {
      const userInfo = UserState.getUserInfo(getState())
      if (userInfo) {
        await axios.post(`/api/user/lang?lang=${language}`)
      }

      if (language === 'ar') document.body.classList.add('rtl')
      if (language !== 'ar') document.body.classList.remove('rtl')

      return { language }
    } catch (err) {
      dispatch(applicationError(err))
      return { language }
    }
  }
)
