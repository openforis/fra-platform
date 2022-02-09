import { createAsyncThunk } from '@reduxjs/toolkit'

import axios from 'axios'
import { ApiEndPoint } from '@common/api/endpoint'
import { CountryIso } from '@meta/area'
import { NodeValue } from '@meta/assessment'

// TODO: update return type from <any>
export const getSectionData = createAsyncThunk<
  Array<{ tableName: string; data: Record<CountryIso, Record<string, NodeValue>> }>,
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
  return data
})
