import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { Functions } from 'utils/functions'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CycleParams } from 'meta/api/request'
import { OriginalDataPoint } from 'meta/assessment'

type Props = CycleParams & {
  originalDataPoint: OriginalDataPoint
  id: string
  year: string
  targetYear: string
}

const putOriginalDataPointYear = Functions.debounce(
  async (props: Props) => {
    const { countryIso, assessmentName, cycleName, year, targetYear, id } = props

    const params = { countryIso, assessmentName, cycleName, sectionName: 'extentOfForest' }
    const config = { params }
    const data = { id, year, targetYear }
    await axios.put(ApiEndPoint.CycleData.OriginalDataPoint.year(), data, config)
  },
  1000,
  'updateOriginalDataPointYear'
)

export const updateOriginalDataPointYear = createAsyncThunk<OriginalDataPoint, Props>(
  'originalDataPoint/year/update',
  async (props) => {
    putOriginalDataPointYear(props)
    return props.originalDataPoint
  }
)
