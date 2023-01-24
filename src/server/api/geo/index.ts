import { Express } from 'express'

import { ApiEndPoint } from '@meta/api/endpoint'

import { GeeAuthMiddleware } from '@server/middleware/geeAuth'
import { ValidationMiddleware } from '@server/middleware/validation'
import { GeoSchemes } from '@server/middleware/validation/geoSchemes'

import { getBoundariesLayer } from './getBoundariesLayer'
import { getForestAgreementLayer } from './getForestAgreementLayer'
import { estimateForestAgreementArea, getForestEstimations } from './getForestEstimations'
import { getForestLayer } from './getForestLayer'

export const GeoApi = {
  init: (express: Express): void => {
    express.get(
      ApiEndPoint.Geo.Layers.forest(),
      ValidationMiddleware.validateRequest(GeoSchemes.forestLayerSchema),
      GeeAuthMiddleware.requireLogin,
      getForestLayer
    )
    express.get(
      ApiEndPoint.Geo.Layers.forestAgreement(),
      ValidationMiddleware.validateRequest(GeoSchemes.forestAgreementLayerSchema),
      GeeAuthMiddleware.requireLogin,
      getForestAgreementLayer
    )

    express.get(
      ApiEndPoint.Geo.Layers.estimations(),
      ValidationMiddleware.validateRequest(GeoSchemes.forestEstimationsSchema),
      getForestEstimations
    )

    express.get(
      ApiEndPoint.Geo.Layers.estimateForestAgreementArea(),
      ValidationMiddleware.validateRequest(GeoSchemes.forestAgreementEstimationSchema),
      GeeAuthMiddleware.requireLogin,
      estimateForestAgreementArea
    )

    express.get(ApiEndPoint.Geo.Layers.boundaries(), GeeAuthMiddleware.requireLogin, getBoundariesLayer)
  },
}
