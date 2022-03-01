import { createAsyncThunk } from '@reduxjs/toolkit'

import axios from 'axios'
import { ApiEndPoint } from '@common/api/endpoint'
import { OriginalDataPoint } from '@meta/assessment'

export const deleteOriginalDataPoint = createAsyncThunk<
  void,
  { assessmentName: string; cycleName: string; originalDataPoint: OriginalDataPoint }
>('originalDataPoint/delete', async ({ assessmentName, cycleName, originalDataPoint }) => {
  await axios.delete(
    ApiEndPoint.Assessment.OriginalDataPoint.one(assessmentName, cycleName, String(originalDataPoint.id))
  )
})
