import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { AssessmentName, CycleName } from 'meta/assessment'
import { Link } from 'meta/cycleData'

import { ThunkApiConfig } from 'client/store/types'

type Props = {
  assessmentName: AssessmentName
  cycleName: CycleName
  link: Link
}

export const updateLink = createAsyncThunk<Link, Props, ThunkApiConfig>('links/update', async (props) => {
  const { assessmentName, cycleName, link } = props
  const params = { assessmentName, cycleName }

  const { data } = await axios.patch(ApiEndPoint.CycleData.Links.one(), { link }, { params })
  return data
})
