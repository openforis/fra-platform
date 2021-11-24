import axios from 'axios'

import { applicationError } from '../../../components/error/actions'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../../../store/RootState'
import { Lang } from '@core/lang'

export const switchLanguage = createAsyncThunk('app/switchLanguage', async (language: Lang, { dispatch, getState }) => {
  try {
    if ((getState() as RootState).user) {
      await axios.post(`/api/user/lang?lang=${language}`)
    }

    if (language === 'ar') document.body.classList.add('rtl')
    if (language !== 'ar') document.body.classList.remove('rtl')

    return { language }
  } catch (err) {
    dispatch(applicationError(err))
    return { language }
  }
})
