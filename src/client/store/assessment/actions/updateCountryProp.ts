import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from '@meta/api/endpoint'
import { Country, CountryIso } from '@meta/area'
import { AssessmentName } from '@meta/assessment'

export const updateCountryProp = createAsyncThunk<
  Country,
  {
    assessmentName: AssessmentName
    countryIso: CountryIso
    cycleName: string
    sectionName: string
    useOriginalDataPoint: boolean
  }
>(
  'assessment/post/countryProp',
  async ({ assessmentName, countryIso, cycleName, sectionName, useOriginalDataPoint }) => {
    const { data } = await axios.patch(
      ApiEndPoint.Area.countryProp(),
      {
        useOriginalDataPoint,
      },
      {
        params: {
          assessmentName,
          countryIso,
          cycleName,
          sectionName,
        },
      }
    )
    return data
  }
)
