import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from '@meta/api/endpoint'
import { CycleDataParams } from '@meta/api/request'

export const clearTableData = createAsyncThunk<void, CycleDataParams & { tableName: string }>(
  'section/tableData/clear',
  async (params) => {
    await axios.post(ApiEndPoint.CycleData.Table.tableClear(), {}, { params })
  }
)
