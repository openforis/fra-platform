import { createAsyncThunk } from '@reduxjs/toolkit'
import { Functions } from '@utils/functions'
import axios from 'axios'
import { Dispatch } from 'redux'

import { ApiEndPoint } from '@meta/api/endpoint'
import { CycleParams } from '@meta/api/request'
import { ODPs, OriginalDataPoint } from '@meta/assessment'

import { setOriginalDataPointUpdating } from '@client/store/pages/originalDataPoint/actions/setOriginalDataPointUpdating'

type Props = CycleParams & {
  originalDataPoint: OriginalDataPoint
}

const putOriginalDataPoint = Functions.debounce(
  async (props: Props, dispatch: Dispatch) => {
    const { countryIso, assessmentName, cycleName, originalDataPoint } = props

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
          sectionName: 'extentOfForest',
        },
      }
    )
    dispatch(setOriginalDataPointUpdating(false))
  },
  1000,
  'updateOriginalDataPoint'
)

export const updateOriginalDataPoint = createAsyncThunk<OriginalDataPoint, Props>(
  'originalDataPoint/update',
  async (props, { dispatch }) => {
    putOriginalDataPoint(props, dispatch)
    return props.originalDataPoint
  }
)
