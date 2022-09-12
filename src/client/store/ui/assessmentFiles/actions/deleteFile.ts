import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from '@meta/api/endpoint'
import { CycleParams } from '@meta/api/request'

type Params = CycleParams & {
  uuid: string
}

export const deleteFile = createAsyncThunk<void, Params>('assessment/files/delete', async (params) => {
  const { uuid } = params
  const { data } = await axios.delete(ApiEndPoint.File.Assessment.one(uuid), { params })
  return data
})
