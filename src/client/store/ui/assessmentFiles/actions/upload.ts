import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CycleParams } from 'meta/api/request'
import { AreaCode } from 'meta/area'
import { AssessmentFile, AssessmentFileProps } from 'meta/cycleData'

type Params = CycleParams & {
  file: File | null
  fileCountryIso?: AreaCode
  props?: AssessmentFileProps
}

export const upload = createAsyncThunk<AssessmentFile, Params>('assessmentFiles/put/upload', async (params) => {
  const { countryIso, assessmentName, cycleName, file, fileCountryIso, props } = params

  const formData = new FormData()
  formData.append('countryIso', countryIso)
  formData.append('assessmentName', assessmentName)
  formData.append('cycleName', cycleName)
  formData.append('file', file)
  if (props) formData.append('props', JSON.stringify(props))
  if (fileCountryIso) formData.append('fileCountryIso', fileCountryIso)

  const config = { headers: { 'Content-Type': 'multipart/form-data' } }
  const { data } = await axios.put(ApiEndPoint.File.Assessment.many(), formData, config)

  return data
})
