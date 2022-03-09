import { createAsyncThunk } from '@reduxjs/toolkit'

import axios from 'axios'
import { ApiEndPoint } from '@common/api/endpoint'
import { ODPs, OriginalDataPoint } from '@meta/assessment'
import { Functions } from '@core/utils'
import { Dispatch } from 'redux'
import { setOriginalDataPointUpdating } from '@client/store/pages/originalDataPoint/actions/setOriginalDataPointUpdating'

type Params = { assessmentName: string; cycleName: string; originalDataPoint: OriginalDataPoint }

const putOriginalDataPoint = Functions.debounce(async (params: Params, dispatch: Dispatch) => {
  const { assessmentName, cycleName, originalDataPoint } = params
  await axios.put(
    ApiEndPoint.Assessment.OriginalDataPoint.one(assessmentName, cycleName, String(originalDataPoint.id)),
    {
      originalDataPoint: ODPs.removeNationalClassPlaceHolder(originalDataPoint),
    }
  )
  dispatch(setOriginalDataPointUpdating(false))
}, 250)

export const updateOriginalDataPoint = createAsyncThunk<OriginalDataPoint, Params>(
  'originalDataPoint/update',
  async (params, { dispatch }) => {
    putOriginalDataPoint(params, dispatch)
    return params.originalDataPoint
  }
)
