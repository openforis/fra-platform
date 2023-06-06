import { ApiEndPoint } from 'meta/api/endpoint'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { CycleDataParams } from 'meta/api/request'

type Params = CycleDataParams & {
  key: string
}

export const resolveTopic = createAsyncThunk<void, Params>('messageCenter/topic/resolve', async (params) => {
  await axios.put(ApiEndPoint.MessageCenter.topicResolve(), {}, { params })
})
