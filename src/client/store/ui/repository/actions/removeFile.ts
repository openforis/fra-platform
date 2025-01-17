import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CycleDataParams } from 'meta/api/request'

import { ThunkApiConfig } from 'client/store/types'

type Props = CycleDataParams & {
  uuid: string
}

export const removeFile = createAsyncThunk<void, Props, ThunkApiConfig>('file/remove', async (props) => {
  const { uuid } = props
  await axios.delete(ApiEndPoint.File.one(), { params: { uuid, ...props } })
})
