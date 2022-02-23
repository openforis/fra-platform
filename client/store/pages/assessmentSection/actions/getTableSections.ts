import { createAsyncThunk } from '@reduxjs/toolkit'

import axios from 'axios'
import { ApiEndPoint } from '@common/api/endpoint'
import { CountryIso } from '@meta/area'
import { TableSection } from '@meta/assessment'

export const getTableSections = createAsyncThunk<
  Array<TableSection>,
  { countryIso: CountryIso; assessmentName: string; cycleName: string; section: string }
>('section/get/metadata', async ({ countryIso, assessmentName, cycleName, section }) => {
  const { data } = await axios.get(
    ApiEndPoint.Assessment.Sections.Metadata.many(countryIso, assessmentName, cycleName, section)
  )
  return data
})
