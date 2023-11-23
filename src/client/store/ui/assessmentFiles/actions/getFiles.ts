import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CycleParams } from 'meta/api/request'
import { AssessmentFile } from 'meta/cycleData'

export const getFiles = createAsyncThunk<Array<AssessmentFile>, CycleParams>(
  'assessmentFiles/get/many',
  async (params) => {
    const { data } = await axios.get(ApiEndPoint.File.Assessment.many(), { params })
    return data
  }
)
