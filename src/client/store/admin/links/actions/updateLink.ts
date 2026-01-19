import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CountryIso } from 'meta/area/countryIso'
import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'
import { Link } from 'meta/cycleData/links/link'

import { ThunkApiConfig } from 'client/store/types'

type Props = {
  assessmentName: AssessmentName
  countryIso?: CountryIso
  cycleName: CycleName
  link: Link
}

export const updateLink = createAsyncThunk<Link, Props, ThunkApiConfig>('links/update', async (props) => {
  const { assessmentName, countryIso, cycleName, link } = props
  const params = { assessmentName, countryIso, cycleName }

  const { data } = await axios.patch(ApiEndPoint.CycleData.Links.one(), { link }, { params })
  return data
})
