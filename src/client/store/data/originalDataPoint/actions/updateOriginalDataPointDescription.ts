import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CountryParams } from 'meta/api/request/country'
import { CountryIso } from 'meta/area/countryIso'
import { OriginalDataPoint, OriginalDataPointCommentKey } from 'meta/assessment/originalDataPoint'
import { SectionNames } from 'meta/assessment/section'
import { Functions } from 'utils/functions'

type Props = CountryParams & {
  countryIso: CountryIso
  field: OriginalDataPointCommentKey
  originalDataPoint: OriginalDataPoint
}

const putOriginalDataPointDescription = Functions.debounce(
  async (props: Props) => {
    const { assessmentName, countryIso, cycleName, field, originalDataPoint } = props

    const data = { field, originalDataPoint }
    const params = { countryIso, assessmentName, cycleName, sectionName: SectionNames.extentOfForest }
    const config = { params }

    await axios.put(ApiEndPoint.CycleData.NationalDataPoint.description(), data, config)
  },
  1000,
  'updateOriginalDataPointDescription'
)

export const updateOriginalDataPointDescription = createAsyncThunk<OriginalDataPoint, Props>(
  'data/originalDataPoint/description/update',
  async (props) => {
    putOriginalDataPointDescription(props)
    return props.originalDataPoint
  }
)
