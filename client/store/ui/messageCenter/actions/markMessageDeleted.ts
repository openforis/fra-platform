import { ApiEndPoint } from '@common/api/endpoint'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { AssessmentName } from '@meta/assessment'

type Params = {
  assessmentName: AssessmentName
  cycleName: string
  topicKey: string
  messageId: number
}

export const markMessageDeleted = createAsyncThunk<void, Params>(
  'messageCenter/topicMessage/markDeleted',
  async ({ assessmentName, cycleName, topicKey, messageId }) => {
    const params = { assessmentName, cycleName, topicKey, messageId }
    await axios.delete(ApiEndPoint.MessageCenter.Topic.getMessage(), { params })
  }
)
