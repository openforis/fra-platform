import { ApiEndPoint } from '@common/api/endpoint'
import { Express } from 'express'

import { AuthMiddleware } from '@server/middleware/auth'

import { getReviewStatus } from './review/getReviewStatus'
import { getReviewSummary } from './review/getReviewSummary'
import { getTableData } from './table/getTableData'
import { persistNodeValues } from './table/persistNodeValues'
import { postEstimation } from './table/postEstimation'

export const CycleDataApi = {
  init: (express: Express): void => {
    // Table
    express.get(ApiEndPoint.CycleData.Table.tableData(), AuthMiddleware.requireView, getTableData)
    express.patch(ApiEndPoint.CycleData.Table.nodes(), AuthMiddleware.requireEdit, persistNodeValues)
    express.post(ApiEndPoint.CycleData.Table.estimate(), AuthMiddleware.requireEdit, postEstimation)

    // Review
    express.get(ApiEndPoint.CycleData.Review.status(), AuthMiddleware.requireView, getReviewStatus)
    express.get(ApiEndPoint.CycleData.Review.summary(), AuthMiddleware.requireView, getReviewSummary)
  },
}
