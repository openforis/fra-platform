import { Functions } from '@core/utils'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { Dispatch } from 'redux'

import { ApiEndPoint } from '@meta/api/endpoint'
import { CycleParams } from '@meta/api/request'
import { ODPs, OriginalDataPoint } from '@meta/assessment'

import { setOriginalDataPointUpdating } from '@client/store/pages/originalDataPoint/actions/setOriginalDataPointUpdating'

type Params = CycleParams & {
  originalDataPoint: OriginalDataPoint
}

const putOriginalDataPoint = Functions.debounce(async (params: Params, dispatch: Dispatch) => {
  const { countryIso, assessmentName, cycleName, originalDataPoint } = params
  await axios.put(
    ApiEndPoint.CycleData.OriginalDataPoint.one(),
    {
      originalDataPoint: ODPs.removeNationalClassPlaceHolder(originalDataPoint),
    },
    {
      params: {
        countryIso,
        assessmentName,
        cycleName,
      },
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
