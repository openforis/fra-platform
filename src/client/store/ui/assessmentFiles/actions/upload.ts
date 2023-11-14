import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CycleParams } from 'meta/api/request'
import { CountryIso } from 'meta/area'
import { AssessmentFile } from 'meta/cycleData'

type Params = CycleParams & {
  file: File | null
  fileCountryIso?: CountryIso
}

export const upload = createAsyncThunk<AssessmentFile, Params>('assessmentFiles/put/upload', async (params) => {
  const { countryIso, assessmentName, cycleName, file, fileCountryIso } = params

  const formData = new FormData()
  formData.append('countryIso', countryIso)
  formData.append('assessmentName', assessmentName)
  formData.append('cycleName', cycleName)
  formData.append('file', file)
  if (fileCountryIso) formData.append('fileCountryIso', fileCountryIso)

  const { data } = await axios.put(ApiEndPoint.File.Assessment.many(), formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return data
})
