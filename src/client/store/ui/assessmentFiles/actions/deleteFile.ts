import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CycleParams } from 'meta/api/request'
import { CountryIso } from 'meta/area'

type Params = CycleParams & {
  uuid: string
  fileCountryIso?: CountryIso
}

export const deleteFile = createAsyncThunk<void, Params>('assessmentFiles/delete/one', async (params) => {
  const { uuid } = params
  const { data } = await axios.delete(ApiEndPoint.File.Assessment.one(uuid), { params })
  return data
})
