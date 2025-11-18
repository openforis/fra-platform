import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { Functions } from 'utils/functions'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CountryParams } from 'meta/api/request/country'
import { CountryIso } from 'meta/area/countryIso'
import { ODPs } from 'meta/assessment/odps'
import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'

type Props = CountryParams & {
  countryIso: CountryIso
  originalDataPoint: OriginalDataPoint
}

const putOriginalDataPointNationalClasses = Functions.debounce(
  async (props: Props) => {
    const { assessmentName, countryIso, cycleName, originalDataPoint } = props

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
  'data/originalDataPoint/nationalClasses/update',
  async (props) => {
    putOriginalDataPointNationalClasses(props)
    return props.originalDataPoint
  }
)
