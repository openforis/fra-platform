import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CycleParams } from 'meta/api/request'

import { NewFile } from 'client/pages/CountryHome/Repository/CreateFile/Panel/newFile'

type Params = CycleParams & {
  file: NewFile
}

export const save = createAsyncThunk<void, Params>('repository/save', async (props) => {
  const { assessmentName, cycleName, countryIso, file } = props
  const formData = new FormData()
  formData.append('name', file?.name || '')
  formData.append('link', file?.link || '')

  if (file?.file) formData.append('file', file.file)

  const params = { countryIso, assessmentName, cycleName }
  const config = { params }
  await axios.post(ApiEndPoint.CycleData.Repository.one(), formData, config)
})
