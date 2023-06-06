import { ApiEndPoint } from 'meta/api/endpoint'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { CycleDataParams } from 'meta/api/request'
import { MessageTopicType } from 'meta/messageCenter'

type Params = CycleDataParams & {
  key: string
  message: string
  type: MessageTopicType
}

export const postMessage = createAsyncThunk<void, Params>(
  'messageCenter/topicMessage/post',
  async ({ message, ...params }) => {
    await axios.post(ApiEndPoint.MessageCenter.topicMessage(), { message }, { params })
  }
)
