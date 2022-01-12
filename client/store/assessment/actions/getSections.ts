import { createAsyncThunk } from '@reduxjs/toolkit'

import axios from 'axios'
import { ApiEndPoint } from '@common/api/endpoint'
import { Section } from '@meta/assessment'

export const getSections = createAsyncThunk<Array<Section>, { name: string; cycleName: string }>(
  'assessment/get/sections',
  async ({ name, cycleName }) => {
    const { data } = await axios.get(ApiEndPoint.Assessment.sections(name, cycleName))
    return data
  }
)
