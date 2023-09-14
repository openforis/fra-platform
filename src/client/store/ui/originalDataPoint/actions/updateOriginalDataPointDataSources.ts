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

const putOriginalDataPointDataSources = Functions.debounce(
  async (props: Props) => {
    const { countryIso, assessmentName, cycleName, originalDataPoint } = props

    await axios.put(
      ApiEndPoint.CycleData.OriginalDataPoint.dataSources(),
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
  },
  1000,
  'updateOriginalDataPointDataSources'
)

export const updateOriginalDataPointDataSources = createAsyncThunk<OriginalDataPoint, Props>(
  'originalDataPoint/dataSources/update',
  async (props) => {
    putOriginalDataPointDataSources(props)
    return props.originalDataPoint
  }
)
