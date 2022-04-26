import { ApiEndPoint } from '@common/api/endpoint'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { CountryIso } from '@meta/area'
import { TableData } from '@meta/data'

export const getTableData = createAsyncThunk<
  TableData,
  { countryIso: CountryIso; assessmentName: string; cycleName: string; tableNames: Array<string> }
>('section/get/data', async ({ countryIso, assessmentName, cycleName, tableNames }) => {
  const { data } = await axios.get(ApiEndPoint.Assessment.TableData.one(), {
    params: {
      countryIso,
      assessmentName,
      cycleName,
      tableNames,
      countryISOs: [countryIso],
    },
  })
  return data
})
