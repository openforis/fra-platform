import { ApiEndPoint } from '@common/api/endpoint'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { CountryIso } from '@meta/area'

export const getDescription = createAsyncThunk<
  Record<string, string>,
  { countryIso: CountryIso; assessmentName: string; cycleName: string; sectionName: string; name: string }
>('section/get/description', async ({ countryIso, assessmentName, cycleName, sectionName, name }) => {
  const {
    data: { content },
  } = await axios.get(ApiEndPoint.Assessment.Data.descriptions(), {
    params: { countryIso, assessmentName, cycleName, sectionName, name },
  })

  return {
    content,
    name,
    sectionName,
  }
})
