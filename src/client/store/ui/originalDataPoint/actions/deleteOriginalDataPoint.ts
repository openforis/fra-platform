import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CycleParams } from 'meta/api/request'
import { OriginalDataPoint } from 'meta/assessment'

export const deleteOriginalDataPoint = createAsyncThunk<void, CycleParams & { originalDataPoint: OriginalDataPoint }>(
  'originalDataPoint/delete',
  async ({ countryIso, assessmentName, cycleName, originalDataPoint: { year } }) => {
    await axios.delete(ApiEndPoint.CycleData.OriginalDataPoint.one(), {
      params: {
        countryIso,
        assessmentName,
        cycleName,
        year,
        sectionName: 'extentOfForest',
      },
    })
  }
)
