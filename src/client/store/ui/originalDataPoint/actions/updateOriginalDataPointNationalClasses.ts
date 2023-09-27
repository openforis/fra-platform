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

const putOriginalDataPointNationalClasses = Functions.debounce(
  async (props: Props) => {
    const { countryIso, assessmentName, cycleName, originalDataPoint } = props

    await axios.put(
      ApiEndPoint.CycleData.OriginalDataPoint.nationalClasses(),
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
  'updateOriginalDataPointNationalClasses'
)

export const updateOriginalDataPointNationalClasses = createAsyncThunk<OriginalDataPoint, Props>(
  'originalDataPoint/nationalClasses/update',
  async (props) => {
    putOriginalDataPointNationalClasses(props)
    return props.originalDataPoint
  }
)
