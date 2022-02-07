import { createAsyncThunk } from '@reduxjs/toolkit'

import axios from 'axios'
import { ApiEndPoint } from '@common/api/endpoint'
import { CountryIso } from '@meta/area'

// TODO: update return type from <any>
export const fetchSectionData = createAsyncThunk<
  Array<{ tableName: string; data: any }>,
  { countryIso: CountryIso; assessmentName: string; cycleName: string; section: string; tableNames: Array<string> }
>('section/get/data', async ({ countryIso, assessmentName, cycleName, section, tableNames }) => {
  const { data } = await axios.get(ApiEndPoint.Assessment.Table.one(countryIso, assessmentName, cycleName, section), {
    params: {
      tableNames,
    },
  })
  return data
})
