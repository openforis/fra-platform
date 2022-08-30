import { createAsyncThunk } from '@reduxjs/toolkit'
import { Functions } from '@utils/functions'
import axios from 'axios'

import { ApiEndPoint } from '@meta/api/endpoint'
import { CycleDataParams } from '@meta/api/request'

const patchDescription = Functions.debounce(async (props: CycleDataParams & { name: string; content: string }) => {
  const { content, ...params } = props

  try {
    await axios.put(ApiEndPoint.CycleData.descriptions(), { content }, { params })
  } catch (e) {
    // placeholder to avoid app crash
  }
}, 250)

export const updateDescription = createAsyncThunk<void, CycleDataParams & { name: string; content: string }>(
  'section/description/update',
  (params) => {
    patchDescription(params)
  }
)
