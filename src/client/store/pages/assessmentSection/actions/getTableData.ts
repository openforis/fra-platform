import { ApiEndPoint } from '@meta/api/endpoint'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { CycleParams } from '@meta/api/request'
import { TableData } from '@meta/data'

export const getTableData = createAsyncThunk<TableData, CycleParams & { tableNames: Array<string> }>(
  'section/get/data',
  async ({ countryIso, assessmentName, cycleName, tableNames }) => {
    const { data } = await axios.get(ApiEndPoint.CycleData.Table.tableData(), {
      params: {
        countryIso,
        assessmentName,
        cycleName,
        tableNames,
        countryISOs: [countryIso],
        mergeOdp: false,
      },
    })
    return data
  }
)
