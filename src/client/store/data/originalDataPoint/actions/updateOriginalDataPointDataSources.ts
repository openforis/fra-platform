import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CountryParams } from 'meta/api/request/country'
import { CountryIso } from 'meta/area/countryIso'
import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'
import { Functions } from 'utils/functions'

type Props = CountryParams & {
  countryIso: CountryIso
  originalDataPoint: OriginalDataPoint
}

const putOriginalDataPointDataSources = Functions.debounce(
  async (props: Props) => {
    const { assessmentName, countryIso, cycleName, originalDataPoint } = props

    const data = { originalDataPoint }
    const params = { countryIso, assessmentName, cycleName, sectionName: 'extentOfForest' }
    const config = { params }

    await axios.put(ApiEndPoint.CycleData.NationalDataPoint.dataSources(), data, config)
  },
  1000,
  'updateOriginalDataPointDataSources'
)

export const updateOriginalDataPointDataSources = createAsyncThunk<OriginalDataPoint, Props>(
  'data/originalDataPoint/dataSources/update',
  async (props) => {
    putOriginalDataPointDataSources(props)
    return props.originalDataPoint
  }
)
