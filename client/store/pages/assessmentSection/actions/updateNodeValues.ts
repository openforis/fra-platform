import { ApiEndPoint } from '@common/api/endpoint'
import { Functions } from '@core/utils'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { NodesPatchBody } from '@meta/api/cycleData/nodes'

const patchNodeValues = Functions.debounce(async (params: NodesPatchBody) => {
  try {
    await axios.patch(ApiEndPoint.CycleData.Nodes.many(), params)
  } catch (e) {
    // placeholder to avoid app crash
  }
}, 250)

export const updateNodeValues = createAsyncThunk<void, NodesPatchBody>('section/nodeValues/update', (params) => {
  patchNodeValues(params)
})
