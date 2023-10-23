import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { Functions } from 'utils/functions'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CycleParams } from 'meta/api/request'
import { OriginalDataPoint } from 'meta/assessment'

import { AppDispatch } from 'client/store/store'

import { getOriginalDataPointReservedYears } from './getOriginalDataPointReservedYears'

type Props = CycleParams & {
  originalDataPoint: OriginalDataPoint
  id: string
  year: string
  targetYear: string
}

const putOriginalDataPointYear = Functions.debounce(
  async (props: Props, dispatch: AppDispatch) => {
    const { countryIso, assessmentName, cycleName, year, targetYear, id } = props

    const params = { countryIso, assessmentName, cycleName, sectionName: 'extentOfForest' }
    const config = { params }
    const data = { id, year, targetYear }
    await axios.put(ApiEndPoint.CycleData.OriginalDataPoint.year(), data, config)
    dispatch(getOriginalDataPointReservedYears(params))
  },
  1000,
  'updateOriginalDataPointYear'
)

export const updateOriginalDataPointYear = createAsyncThunk<OriginalDataPoint, Props>(
  'originalDataPoint/year/update',
  async (props, { dispatch }) => {
    putOriginalDataPointYear(props, dispatch)
    return props.originalDataPoint
  }
)
