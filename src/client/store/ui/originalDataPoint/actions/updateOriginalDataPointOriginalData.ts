import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { Functions } from 'utils/functions'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CycleDataParams } from 'meta/api/request'
import { CountryIso } from 'meta/area'
import { ODPs, OriginalDataPoint } from 'meta/assessment'

type Props = CycleDataParams & {
  countryIso: CountryIso
  originalDataPoint: OriginalDataPoint
}

const putOriginalDataPointOriginalData = Functions.debounce(
  async (props: Props) => {
    const { assessmentName, cycleName, countryIso, sectionName, originalDataPoint } = props

    const params = { countryIso, assessmentName, cycleName, sectionName }
    const data = { originalDataPoint: ODPs.removeNationalClassPlaceHolder(originalDataPoint) }
    const config = { params }

    await axios.put(ApiEndPoint.CycleData.OriginalDataPoint.originalData(), data, config)
  },
  1000,
  'updateOriginalDataPointOriginalData'
)

export const updateOriginalDataPointOriginalData = createAsyncThunk<OriginalDataPoint, Props>(
  'originalDataPoint/originalData/update',
  async (props) => {
    putOriginalDataPointOriginalData(props)
    return props.originalDataPoint
  }
)
