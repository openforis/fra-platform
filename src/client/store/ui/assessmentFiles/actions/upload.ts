import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from '@meta/api/endpoint'
import { CycleParams } from '@meta/api/request'

type Params = CycleParams & {
  file: File | null
}

export const upload = createAsyncThunk<void, Params>('assessmentFiles/put/upload', async (params) => {
  const { countryIso, assessmentName, cycleName, file } = params

  const formData = new FormData()
  formData.append('countryIso', countryIso)
  formData.append('assessmentName', assessmentName)
  formData.append('cycleName', cycleName)
  formData.append('file', file)

  await axios.put(ApiEndPoint.File.Assessment.many(), formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
})
