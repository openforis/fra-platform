import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { Country } from 'meta/area/country'
import { CountryIso } from 'meta/area/countryIso'
import { AssessmentName } from 'meta/assessment/assessment'

type Props = {
  assessmentName: AssessmentName
  country: Country
  countryIso: CountryIso
  cycleName: string
  message?: string
  notifySelf?: boolean
  notifyUsers?: boolean
}

export const updateCountry = createAsyncThunk<Country, Props>('assessment/patch/country', async (props) => {
  const { assessmentName, country, countryIso, cycleName, message, notifySelf, notifyUsers } = props

  const params = { assessmentName, countryIso, cycleName, notifySelf, notifyUsers }
  const { data } = await axios.patch(ApiEndPoint.Area.country(), { country, message }, { params })
  return data
})
