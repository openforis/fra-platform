import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CycleDataParams } from 'meta/api/request/cycleData/cycleData'

type Params = CycleDataParams & {
  key: string
}

export const resolveTopic = createAsyncThunk<void, Params>('messageCenter/topic/resolve', async (params) => {
  await axios.put(ApiEndPoint.MessageCenter.topicResolve(), {}, { params })
})
