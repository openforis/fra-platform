import { ApiEndPoint } from '@common/api/endpoint'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { CountryIso } from '@meta/area'
import { TableData } from '@meta/data'

export const postEstimate = createAsyncThunk<
  TableData,
  {
    assessmentName: string
    countryIso: CountryIso
    cycleName: string
    fields: Array<{ annualChangeRates: { past: string; future: string }; variableName: string }>
    method: string
    sectionName: string
    tableName: string
  }
>(
  'section/post/estimate',
  async ({ assessmentName, countryIso, sectionName, tableName, method, fields, cycleName }) => {
    const { data } = await axios.post(ApiEndPoint.Assessment.TableData.Estimate.many(), {
      fields,
      countryIso,
      assessmentName,
      cycleName,
      method,
      sectionName,
      tableName,
    })
    return data
  }
)
