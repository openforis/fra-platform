import { Express } from 'express'
// @ts-ignore
import queue from 'express-queue'

import { ApiEndPoint } from 'meta/api/endpoint'

import { clearTable } from 'server/api/cycleData/table/clearTable'
import { estimateValues } from 'server/api/cycleData/table/estimateValues'
import { getNodeValuesEstimations } from 'server/api/cycleData/table/getNodeValuesEstimations'
import { getTableData } from 'server/api/cycleData/table/getTableData'
import { getTableDataHistory } from 'server/api/cycleData/table/getTableDataHistory'
import { persistNodeValues } from 'server/api/cycleData/table/persistNodeValues'
import { AuthMiddleware } from 'server/middleware/auth'

export const TableDataApi = {
  init: (express: Express): void => {
    // Table
    express.get(ApiEndPoint.CycleData.Table.tableData(), AuthMiddleware.requireView, getTableData)
    express.get(ApiEndPoint.CycleData.Table.tableDataHistory(), AuthMiddleware.requireViewHistory, getTableDataHistory)
    express.get(
      ApiEndPoint.CycleData.Table.nodeValuesEstimations(),
      AuthMiddleware.requireEditTableData,
      getNodeValuesEstimations
    )
    express.patch(ApiEndPoint.CycleData.Table.nodes(), AuthMiddleware.requireEditTableData, persistNodeValues)
    express.post(
      ApiEndPoint.CycleData.Table.estimate(),
      queue({ activeLimit: 1 }),
      AuthMiddleware.requireEditTableData,
      estimateValues
    )
    express.post(ApiEndPoint.CycleData.Table.tableClear(), AuthMiddleware.requireEditTableData, clearTable)
  },
}
