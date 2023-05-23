import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from '@meta/api/endpoint'
import { CycleDataParams } from '@meta/api/request'
import { CommentableDescriptionValue } from '@meta/assessment'

export const getDescription = createAsyncThunk<
  Record<string, string> & { value: CommentableDescriptionValue },
  CycleDataParams & { name: string }
>('section/get/description', async ({ countryIso, assessmentName, cycleName, sectionName, name }) => {
  const {
    data: { value },
  } = await axios.get(ApiEndPoint.CycleData.descriptions(), {
    params: { countryIso, assessmentName, cycleName, sectionName, name },
  })

  return {
    value,
    name,
    sectionName,
  }
})
