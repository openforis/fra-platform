import { createAsyncThunk } from '@reduxjs/toolkit'

import axios from 'axios'
import { ApiEndPoint } from '@common/api/endpoint'
import { CountryIso } from '@meta/area'
import { Table } from '@meta/assessment'

export const getSectionTablesMetadata = createAsyncThunk<
  Array<Table>,
  { countryIso: CountryIso; assessmentName: string; cycleName: string; section: string }
>('section/get/metadata', async ({ countryIso, assessmentName, cycleName, section }) => {
  const { data } = await axios.get(
    ApiEndPoint.Assessment.TablesMetadata.many(countryIso, assessmentName, cycleName, section)
  )
  return data
})
