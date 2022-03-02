import { createAsyncThunk } from '@reduxjs/toolkit'

import axios from 'axios'
import { ApiEndPoint } from '@common/api/endpoint'
import { CountryIso } from '@meta/area'
import { TableData } from '@meta/data'

export const getTableData = createAsyncThunk<
  TableData,
  { countryIso: CountryIso; assessmentName: string; cycleName: string; sectionName: string }
>('section/get/data', async ({ countryIso, assessmentName, cycleName, sectionName }) => {
  const { data } = await axios.get(
    ApiEndPoint.Assessment.TableData.one(countryIso, assessmentName, cycleName, sectionName)
  )
  return data?.data
})
