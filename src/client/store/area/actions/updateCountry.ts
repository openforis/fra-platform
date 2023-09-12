import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { Country, CountryIso } from 'meta/area'
import { AssessmentName } from 'meta/assessment'

type Props = {
  assessmentName: AssessmentName
  country: Country
  countryIso: CountryIso
  cycleName: string
  message?: string
  notifyUsers?: boolean
}

export const updateCountry = createAsyncThunk<Country, Props>('assessment/post/country', async (props) => {
  const { country, countryIso, assessmentName, cycleName, notifyUsers, message } = props

  const params = { assessmentName, countryIso, cycleName, notifyUsers }
  const { data } = await axios.post(ApiEndPoint.Area.country(), { country, message }, { params })
  return data
})
