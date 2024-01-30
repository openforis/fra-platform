import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CycleParams } from 'meta/api/request'

import { RepositoryEdit } from 'client/pages/CountryHome/Repository/Panel/repositoryEdit'

type Params = CycleParams & {
  file: RepositoryEdit
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
