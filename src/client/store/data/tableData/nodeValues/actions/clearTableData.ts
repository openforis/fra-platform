import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CycleDataParams } from 'meta/api/request/cycleData/cycleData'

export const clearTableData = createAsyncThunk<void, CycleDataParams & { tableName: string }>(
  'data/tableData/nodeValues/clear',
  async (params) => {
    await axios.post(ApiEndPoint.CycleData.Table.tableClear(), {}, { params })
  }
)
