import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CycleDataParams } from 'meta/api/request/cycleData/cycleData'
import { CountryIso } from 'meta/area/countryIso'
import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'
import { Functions } from 'utils/functions'

type Props = CycleDataParams & {
  countryIso: CountryIso
  originalDataPoint: OriginalDataPoint
}

const putOriginalDataPointOriginalData = Functions.debounce(
  async (props: Props) => {
    const { assessmentName, countryIso, cycleName, originalDataPoint, sectionName } = props

    const data = { originalDataPoint }
    const params = { countryIso, assessmentName, cycleName, sectionName }
    const config = { params }

    await axios.put(ApiEndPoint.CycleData.NationalDataPoint.originalData(), data, config)
  },
  1000,
  'updateOriginalDataPointOriginalData'
)

export const updateOriginalDataPointOriginalData = createAsyncThunk<OriginalDataPoint, Props>(
  'data/originalDataPoint/originalData/update',
  async (props) => {
    putOriginalDataPointOriginalData(props)
    return props.originalDataPoint
  }
)
