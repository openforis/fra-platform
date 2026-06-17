import { Express } from 'express'

import { ApiEndPoint } from 'meta/api/endpoint'

import { getDescriptionValidations } from 'server/api/cycleData/validations/getDescriptionData'
import { getValidationSummary } from 'server/api/cycleData/validations/getSummary'
import { getTableValidations } from 'server/api/cycleData/validations/getTableData'
import { AuthMiddleware } from 'server/middleware/auth'

export const ValidationsApi = {
  init: (express: Express): void => {
    express.get(ApiEndPoint.CycleData.Validations.summary(), AuthMiddleware.requireView, getValidationSummary)
    express.get(
      ApiEndPoint.CycleData.Validations.descriptions(),
      AuthMiddleware.requireEditDescriptions,
      getDescriptionValidations
    )
    express.get(ApiEndPoint.CycleData.Validations.tableData(), AuthMiddleware.requireEditTableData, getTableValidations)
  },
}
