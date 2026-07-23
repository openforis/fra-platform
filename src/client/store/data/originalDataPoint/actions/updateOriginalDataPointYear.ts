import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CountryParams } from 'meta/api/request/country'
import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'
import { SectionNames } from 'meta/assessment/section'
import { Functions } from 'utils/functions'

type Props = CountryParams & {
  originalDataPoint: OriginalDataPoint
  id: string | number
  year: string | number
  targetYear: string | number
}

const putOriginalDataPointYear = Functions.debounce(
  async (props: Props) => {
    const { assessmentName, countryIso, cycleName, id, targetYear, year } = props

    const params = { countryIso, assessmentName, cycleName, sectionName: SectionNames.extentOfForest }
    const config = { params }
    const data = { id, year, targetYear }
    await axios.put(ApiEndPoint.CycleData.NationalDataPoint.year(), data, config)
  },
  1000,
  'updateOriginalDataPointYear'
)

export const updateOriginalDataPointYear = createAsyncThunk<OriginalDataPoint, Props>(
  'data/originalDataPoint/year/update',
  async (props) => {
    putOriginalDataPointYear(props)
    return props.originalDataPoint
  }
)
