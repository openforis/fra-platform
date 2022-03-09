import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from '@common/api/endpoint'
import { Functions } from '@core/utils'
import { ParamsSetNodeValue, setNodeValue } from './setNodeValue'

const postNodeValueDebounced = Functions.debounce(async (params: ParamsSetNodeValue) => {
  const { value, ...rest } = params
  await axios.patch(ApiEndPoint.CycleData.PersistNode.one(), value, { params: rest })
}, 300)

export const updateNodeValue = createAsyncThunk<void, ParamsSetNodeValue>(
  'section/nodeValue/update',
  async (params, { dispatch }) => {
    dispatch(setNodeValue(params))
    postNodeValueDebounced(params)
  }
)
