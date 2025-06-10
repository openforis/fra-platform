import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CycleParams } from 'meta/api/request'
import { ODPs } from 'meta/assessment/odps'
import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'

type Params = CycleParams & { originalDataPoint: OriginalDataPoint }

export const createOriginalDataPoint = createAsyncThunk<OriginalDataPoint, Params>(
  'data/originalDataPoint/create',
  async (props) => {
    const { assessmentName, countryIso, cycleName, originalDataPoint } = props

    const { data } = await axios.post(
      ApiEndPoint.CycleData.OriginalDataPoint.one(),
      {
        originalDataPoint: ODPs.removeNationalClassPlaceHolder(originalDataPoint),
      },
      {
        params: {
          countryIso,
          assessmentName,
          cycleName,
          sectionName: 'extentOfForest',
        },
      }
    )
    return ODPs.addNationalClassPlaceHolder(data)
  }
)
