import { ApiEndPoint } from '@meta/api/endpoint'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { CycleDataParams } from '@meta/api/request'

export const getDescription = createAsyncThunk<Record<string, string>, CycleDataParams & { name: string }>(
  'section/get/description',
  async ({ countryIso, assessmentName, cycleName, sectionName, name }) => {
    const {
      data: { content },
    } = await axios.get(ApiEndPoint.CycleData.descriptions(), {
      params: { countryIso, assessmentName, cycleName, sectionName, name },
    })

    return {
      content,
      name,
      sectionName,
    }
  }
)
