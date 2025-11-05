import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { Country, CountryProps } from 'meta/area/country'
import { CountryIso } from 'meta/area/countryIso'
import { AssessmentName } from 'meta/assessment/assessment'

type Params = {
  assessmentName: AssessmentName
  countryIso: CountryIso
  cycleName: string
  sectionName: string
  countryProp: Partial<CountryProps>
}

export const updateCountryProp = createAsyncThunk<Country, Params>(
  'assessment/post/countryProp',
  async ({ assessmentName, countryIso, countryProp, cycleName, sectionName }) => {
    const params = { assessmentName, countryIso, cycleName, sectionName }

    const { data } = await axios.patch(ApiEndPoint.Area.countryProp(), { countryProp }, { params })

    return data
  }
)
