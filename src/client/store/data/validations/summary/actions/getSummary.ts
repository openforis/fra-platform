import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CountryParams } from 'meta/api/request/country'
import { ValidationSummary } from 'meta/assessment/validation/summary'

export const getSummary = createAsyncThunk<ValidationSummary, CountryParams>(
  'validations/summary/get',
  async (params) => {
    const { data } = await axios.get(ApiEndPoint.CycleData.Validations.summary(), { params })
    return data
  }
)
