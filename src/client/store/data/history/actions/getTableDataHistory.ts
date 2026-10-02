import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CycleDataParams } from 'meta/api/request/cycleData/cycleData'
import { RecordAssessmentData } from 'meta/data/recordData'

type Props = CycleDataParams & { tableNames: Array<string> }

export const getTableDataHistory = createAsyncThunk<RecordAssessmentData, Props>(
  'data/history/tableData/get',
  async (props) => {
    const { assessmentName, countryIso, cycleName, sectionName, tableNames } = props

    const params = { assessmentName, countryIso, cycleName, tableNames, sectionName }
    const { data } = await axios.get(ApiEndPoint.CycleData.Table.tableDataHistory(), { params })

    return data
  }
)
