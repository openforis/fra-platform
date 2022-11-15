import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from '@meta/api/endpoint'
import { Country } from '@meta/area'

export const getCountries = createAsyncThunk<Array<Country>, { assessmentName: string; cycleName: string }>(
  'assessment/countries/get',
  async (params) => {
    const { data } = await axios.get(ApiEndPoint.Area.countries(), { params })
    return data
  }
)
