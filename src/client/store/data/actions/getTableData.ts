import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CycleParams } from 'meta/api/request'
import { TableName } from 'meta/assessment'
import { RecordAssessmentData, RecordAssessmentDatas } from 'meta/data'

type Params = CycleParams & {
  tableName: TableName
  mergeOdp?: boolean
}

const actionType = 'data/tableData/get'

export const getTableData = createAsyncThunk<RecordAssessmentData, Params>(actionType, async (actionParams) => {
  const { countryIso, assessmentName, cycleName, tableName, mergeOdp = false } = actionParams

  const params = { assessmentName, countryIso, cycleName, tableNames: [tableName], countryISOs: [countryIso], mergeOdp }
  const { data } = await axios.get(ApiEndPoint.CycleData.Table.tableData(), { params })

  if (RecordAssessmentDatas.isTableDataEmpty({ assessmentName, cycleName, countryIso, tableName, data })) {
    return { [assessmentName]: { [cycleName]: { [countryIso]: { [tableName]: {} } } } }
  }

  return data
})
