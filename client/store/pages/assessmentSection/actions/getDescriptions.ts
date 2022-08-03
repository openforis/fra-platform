import { ApiEndPoint } from '@common/api/endpoint'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { CountryIso } from '@meta/area'
import { CommentableDescription } from '@meta/assessment/commentableDescription'

export const getDescriptions = createAsyncThunk<
  Array<CommentableDescription>,
  { countryIso: CountryIso; assessmentName: string; cycleName: string; section: string }
>('section/get/descriptions', async ({ countryIso, assessmentName, cycleName, section }) => {
  const { data } = await axios.get(ApiEndPoint.Assessment.Data.descriptions(), {
    params: { countryIso, assessmentName, cycleName, sectionName: section },
  })
  return data
})
