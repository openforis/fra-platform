import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { Country, CountryIso, CountryProps } from 'meta/area'
import { AssessmentName } from 'meta/assessment'

type Params = {
  assessmentName: AssessmentName
  countryIso: CountryIso
  cycleName: string
  sectionName: string
  countryProp: Partial<CountryProps>
}

export const updateCountryProp = createAsyncThunk<Country, Params>(
  'assessment/post/countryProp',
  async ({ assessmentName, countryIso, cycleName, sectionName, countryProp }) => {
    const params = { assessmentName, countryIso, cycleName, sectionName }

    const { data } = await axios.patch(ApiEndPoint.Area.countryProp(), { countryProp }, { params })

    return data
  }
)
