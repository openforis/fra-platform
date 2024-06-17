import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CycleParams } from 'meta/api/request'
import { AssessmentName, CycleName } from 'meta/assessment'
import { RecordAssessmentData } from 'meta/data'

type Props = CycleParams & {
  auth?: { assessmentName: AssessmentName; cycleName: CycleName }
  mergeOdp?: boolean
  tableNames: Array<string>
}

export const getTableData = createAsyncThunk<RecordAssessmentData, Props>('data/tableData/get', async (props) => {
  const { auth, countryIso, assessmentName, cycleName, tableNames, mergeOdp = false } = props

  const authContext = auth ? encodeURIComponent(JSON.stringify(auth)) : undefined
  const params = { assessmentName, countryIso, cycleName, tableNames, countryISOs: [countryIso], mergeOdp, authContext }
  const { data } = await axios.get(ApiEndPoint.CycleData.Table.tableData(), { params })

  return data
})
