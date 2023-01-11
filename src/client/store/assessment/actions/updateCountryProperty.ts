import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from '@meta/api/endpoint'
import { Country, CountryIso } from '@meta/area'
import { AssessmentName } from '@meta/assessment'

export const updateCountryProperty = createAsyncThunk<
  Country,
  {
    assessmentName: AssessmentName
    countryIso: CountryIso
    cycleName: string
    sectionName: string
    useOriginalDataPoint: boolean
  }
>(
  'assessment/post/countryProperty',
  async ({ assessmentName, countryIso, cycleName, sectionName, useOriginalDataPoint }) => {
    const { data } = await axios.post(
      ApiEndPoint.Area.countryProperty(),
      {},
      {
        params: {
          assessmentName,
          countryIso,
          cycleName,
          sectionName,
          useOriginalDataPoint,
        },
      }
    )
    return data
  }
)
