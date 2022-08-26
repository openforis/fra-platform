import { ApiEndPoint } from '@common/api/endpoint'
import { Express } from 'express'

import { AuthMiddleware } from '@server/middleware/auth'

import { createOriginalDataPoint } from './createOriginalDataPoint'
import { deleteOriginalDataPoint } from './deleteOriginalDataPoint'
import { getOriginalDataPoint } from './getOdp'
import { getOriginalDataPointData } from './getOriginalDataPointData'
import { getOriginalDataPoints } from './getOriginalDataPoints'
import { getReservedYears } from './getReservedYears'
import { updateOriginalDataPoint } from './updateOriginalDataPoint'

export const AssessmentApi = {
  init: (express: Express): void => {
    // OriginalDataPoint // entry
    express.get(
      ApiEndPoint.Assessment.OriginalDataPoint.ReservedYears.many(),
      AuthMiddleware.requireView,
      getReservedYears
    )

    express.post(ApiEndPoint.Assessment.OriginalDataPoint.one(), AuthMiddleware.requireEdit, createOriginalDataPoint)
    express.delete(ApiEndPoint.Assessment.OriginalDataPoint.one(), AuthMiddleware.requireEdit, deleteOriginalDataPoint)

    express.get(ApiEndPoint.Assessment.OriginalDataPoint.one(), AuthMiddleware.requireView, getOriginalDataPoint)
    express.put(ApiEndPoint.Assessment.OriginalDataPoint.one(), AuthMiddleware.requireEdit, updateOriginalDataPoint)

    express.get(ApiEndPoint.Assessment.OriginalDataPoint.many(), AuthMiddleware.requireView, getOriginalDataPoints)

    // OriginalDataPoint // table
    express.get(
      ApiEndPoint.Assessment.OriginalDataPoint.TableData.one(),
      AuthMiddleware.requireView,
      getOriginalDataPointData
    )
  },
}
