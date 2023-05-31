import { ApiEndPoint } from 'meta/api/endpoint'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { CycleDataParams } from 'meta/api/request'

type Params = CycleDataParams & {
  topicKey: string
  messageId: number
}

export const markMessageDeleted = createAsyncThunk<void, Params>(
  'messageCenter/topicMessage/markDeleted',
  async (params) => {
    await axios.delete(ApiEndPoint.MessageCenter.topicMessage(), { params })
  }
)
