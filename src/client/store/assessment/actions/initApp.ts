import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { Assessment } from 'meta/assessment'

export const initApp = createAsyncThunk<{ assessment: Assessment }, { assessmentName?: string; cycleName?: string } | void>(
  'assessment/get/init',
  async (params) => {
    const { data } = await axios.get(ApiEndPoint.init(), { params })
    const lang = (await localStorage.getItem('i18n/lang')) ?? data?.user?.lang
    if (lang === 'ar') document.body.classList.add('rtl')
    return data
  }
)
