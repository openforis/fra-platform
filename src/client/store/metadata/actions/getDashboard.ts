import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { AreaCode } from 'meta/area'
import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'
import { DashboardItem } from 'meta/dashboard'

type Returned = Array<DashboardItem>

type Props = {
  assessmentName: AssessmentName
  cycleName: CycleName
  countryIso: AreaCode
}

export const getDashboard = createAsyncThunk<Returned, Props>('metadata/dashboard/get', async (props) => {
  const params = { ...props }
  const { data } = await axios.get(ApiEndPoint.CycleData.Dashboard.one(), { params })
  return data
})
