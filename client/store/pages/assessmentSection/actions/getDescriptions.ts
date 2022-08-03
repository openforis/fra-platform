import { ApiEndPoint } from '@common/api/endpoint'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { CountryIso } from '@meta/area'
import { CommentableDescription } from '@meta/assessment/commentableDescription'

export const getDescriptions = createAsyncThunk<
  Record<string, Record<string, string>>,
  { countryIso: CountryIso; assessmentName: string; cycleName: string; section: string }
>('section/get/descriptions', async ({ countryIso, assessmentName, cycleName, section }) => {
  const { data } = await axios.get(ApiEndPoint.Assessment.Data.descriptions(), {
    params: { countryIso, assessmentName, cycleName, sectionName: section },
  })

  const res: Record<string, Record<string, string>> = {}

  data.forEach((description: CommentableDescription) => {
    const { sectionName, name, content } = description
    if (!res[sectionName]) res[sectionName] = {}
    res[sectionName][name] = content
  })

  return res
})
