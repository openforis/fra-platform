import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { Functions } from 'utils/functions'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CycleParams } from 'meta/api/request'
import { CountryIso } from 'meta/area'
import { ODPs, OriginalDataPoint } from 'meta/assessment'

type Props = CycleParams & {
  countryIso: CountryIso
  originalDataPoint: OriginalDataPoint
}

const putOriginalDataPointDescription = Functions.debounce(
  async (props: Props) => {
    const { countryIso, assessmentName, cycleName, originalDataPoint } = props

    const params = { countryIso, assessmentName, cycleName, sectionName: 'extentOfForest' }
    const config = { params }
    const data = { originalDataPoint: ODPs.removeNationalClassPlaceHolder(originalDataPoint) }
    await axios.put(ApiEndPoint.CycleData.OriginalDataPoint.description(), data, config)
  },
  1000,
  'updateOriginalDataPointDescription'
)

export const updateOriginalDataPointDescription = createAsyncThunk<OriginalDataPoint, Props>(
  'originalDataPoint/description/update',
  async (props) => {
    putOriginalDataPointDescription(props)
    return props.originalDataPoint
  }
)
