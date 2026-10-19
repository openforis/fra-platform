import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CountryParams } from 'meta/api/request/country'
import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'
import { SectionNames } from 'meta/assessment/section'

type Params = CountryParams & { originalDataPoint: OriginalDataPoint }

export const createOriginalDataPoint = createAsyncThunk<OriginalDataPoint, Params>(
  'data/originalDataPoint/create',
  async (props) => {
    const { assessmentName, countryIso, cycleName, originalDataPoint } = props

    const data = { originalDataPoint }
    const params = { countryIso, assessmentName, cycleName, sectionName: SectionNames.extentOfForest }
    const config = { params }

    const { data: ndp } = await axios.post(ApiEndPoint.CycleData.NationalDataPoint.one(), data, config)
    return ndp
  }
)
