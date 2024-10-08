import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CycleParams } from 'meta/api/request'
import { OriginalDataPoint, TableNames } from 'meta/assessment'

export const deleteOriginalDataPoint = createAsyncThunk<void, CycleParams & { originalDataPoint: OriginalDataPoint }>(
  'originalDataPoint/delete',
  async ({ countryIso, assessmentName, cycleName, originalDataPoint: { year } }) => {
    const sectionName = TableNames.extentOfForest
    await axios.delete(ApiEndPoint.CycleData.OriginalDataPoint.one(), {
      params: { assessmentName, cycleName, countryIso, sectionName, year },
    })
  }
)
