import { ApiEndPoint } from '@common/api/endpoint'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { CycleParams } from '@meta/api/request'
import { Section } from '@meta/assessment'

export const getSections = createAsyncThunk<Array<Section>, CycleParams>('assessment/sections/get', async (params) => {
  const { data } = await axios.get(ApiEndPoint.MetaData.sections(), { params })
  return data
})
