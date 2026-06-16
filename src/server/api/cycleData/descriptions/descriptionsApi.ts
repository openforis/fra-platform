import { Express } from 'express'

import { ApiEndPoint } from 'meta/api/endpoint'

import { getDataSources } from 'server/api/cycleData/descriptions/getDataSources'
import { getDescription } from 'server/api/cycleData/descriptions/getDescription'
import { getDescriptionsHistory } from 'server/api/cycleData/descriptions/getDescriptionsHistory'
import { removeDataSource } from 'server/api/cycleData/descriptions/removeDataSource'
import { upsertDescription } from 'server/api/cycleData/descriptions/upsertDescription'
import { AuthMiddleware } from 'server/middleware/auth'

export const DescriptionsApi = {
  init: (express: Express): void => {
    express.get(ApiEndPoint.CycleData.Descriptions.many(), AuthMiddleware.requireView, getDescription)
    express.get(ApiEndPoint.CycleData.Descriptions.history(), AuthMiddleware.requireViewHistory, getDescriptionsHistory)
    express.put(ApiEndPoint.CycleData.Descriptions.many(), AuthMiddleware.requireEditDescriptions, upsertDescription)
    express.get(ApiEndPoint.CycleData.Descriptions.DataSources.many(), AuthMiddleware.requireView, getDataSources)
    express.delete(
      ApiEndPoint.CycleData.Descriptions.DataSources.one(),
      AuthMiddleware.requireEditDescriptions,
      removeDataSource
    )
  },
}
