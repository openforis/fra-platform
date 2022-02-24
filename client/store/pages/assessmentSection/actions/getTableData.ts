import { createAsyncThunk } from '@reduxjs/toolkit'

import axios from 'axios'
import { ApiEndPoint } from '@common/api/endpoint'
import { CountryIso } from '@meta/area'
import { TableData } from '@meta/data'

export const getTableData = createAsyncThunk<
  TableData,
  { countryIso: CountryIso; assessmentName: string; cycleName: string; section: string; tableNames: Array<string> }
>('section/get/data', async ({ countryIso, assessmentName, cycleName, section, tableNames }) => {
  const { data } = await axios.get(
    ApiEndPoint.Assessment.TableData.one(countryIso, assessmentName, cycleName, section),
    {
      params: {
        tableNames,
      },
    }
  )
  return data?.data
})
