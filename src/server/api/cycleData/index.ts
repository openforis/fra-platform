import { Express } from 'express'
// @ts-ignore
import * as queue from 'express-queue'

import { ApiEndPoint } from '@meta/api/endpoint'

import { clearTable } from '@server/api/cycleData/table/clearTable'
import { AuthMiddleware } from '@server/middleware/auth'

import { getDataSources } from './descriptions/getDataSources'
import { getDescription } from './descriptions/getDescription'
import { upsertDescription } from './descriptions/upsertDescription'
import { createOriginalDataPoint } from './originalDataPoint/createOriginalDataPoint'
import { deleteOriginalDataPoint } from './originalDataPoint/deleteOriginalDataPoint'
import { getOriginalDataPoint } from './originalDataPoint/getOdp'
import { getOriginalDataPointData } from './originalDataPoint/getOriginalDataPointData'
import { getOriginalDataPoints } from './originalDataPoint/getOriginalDataPoints'
import { getReservedYears } from './originalDataPoint/getReservedYears'
import { updateOriginalDataPoint } from './originalDataPoint/updateOriginalDataPoint'
import { getReviewStatus } from './review/getReviewStatus'
import { getReviewSummary } from './review/getReviewSummary'
import { estimateValues } from './table/estimateValues'
import { getTableData } from './table/getTableData'
import { getTableEstimations } from './table/getTableEstimations'
import { persistNodeValues } from './table/persistNodeValues'
import { getActivities } from './getActivities'

export const CycleDataApi = {
  init: (express: Express): void => {
    // Table
    express.get(ApiEndPoint.CycleData.Table.tableData(), AuthMiddleware.requireView, getTableData)
    express.get(
      ApiEndPoint.CycleData.Table.tableEstimations(),
      AuthMiddleware.requireEditTableData,
      getTableEstimations
    )
    express.patch(ApiEndPoint.CycleData.Table.nodes(), AuthMiddleware.requireEditTableData, persistNodeValues)
    express.post(
      ApiEndPoint.CycleData.Table.estimate(),
      queue({ activeLimit: 1 }),
      AuthMiddleware.requireEditTableData,
      estimateValues
    )
    express.post(ApiEndPoint.CycleData.Table.tableClear(), AuthMiddleware.requireEditTableData, clearTable)

    // Descriptions
    express.get(ApiEndPoint.CycleData.descriptionsDataSources(), AuthMiddleware.requireView, getDataSources)
    express.get(ApiEndPoint.CycleData.descriptions(), AuthMiddleware.requireView, getDescription)
    express.put(ApiEndPoint.CycleData.descriptions(), AuthMiddleware.requireEditDescriptions, upsertDescription)

    // OriginalDataPoints
    express.get(ApiEndPoint.CycleData.OriginalDataPoint.reservedYears(), AuthMiddleware.requireView, getReservedYears)

    express.post(
      ApiEndPoint.CycleData.OriginalDataPoint.one(),
      AuthMiddleware.requireEditTableData,
      createOriginalDataPoint
    )
    express.delete(
      ApiEndPoint.CycleData.OriginalDataPoint.one(),
      AuthMiddleware.requireEditTableData,
      deleteOriginalDataPoint
    )
    express.get(ApiEndPoint.CycleData.OriginalDataPoint.one(), AuthMiddleware.requireView, getOriginalDataPoint)
    express.put(
      ApiEndPoint.CycleData.OriginalDataPoint.one(),
      AuthMiddleware.requireEditTableData,
      updateOriginalDataPoint
    )

    express.get(ApiEndPoint.CycleData.OriginalDataPoint.many(), AuthMiddleware.requireView, getOriginalDataPoints)

    // OriginalDataPoint // table
    express.get(ApiEndPoint.CycleData.OriginalDataPoint.data(), AuthMiddleware.requireView, getOriginalDataPointData)

    // Review
    express.get(ApiEndPoint.CycleData.Review.status(), AuthMiddleware.requireView, getReviewStatus)
    express.get(ApiEndPoint.CycleData.Review.summary(), AuthMiddleware.requireView, getReviewSummary)

    // Activities
    express.get(ApiEndPoint.CycleData.activities(), AuthMiddleware.requireView, getActivities)
  },
}
