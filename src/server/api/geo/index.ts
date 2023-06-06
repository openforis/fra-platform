import { Express } from 'express'

import { ApiEndPoint } from 'meta/api/endpoint'

import { GeeAuthMiddleware } from 'server/middleware/geeAuth'
import { ValidationMiddleware } from 'server/middleware/validation'
import { GeoSchemes } from 'server/middleware/validation/geoSchemes'

import { getBoundariesLayer } from './getBoundariesLayer'
import { getBounds } from './getBounds'
import { getBurnedAreaLayer } from './getBurnedAreaLayer'
import { getForestAgreementLayer } from './getForestAgreementLayer'
import { estimateImageArea, estimateIntersectionArea, getForestEstimations } from './getForestEstimations'
import { getForestLayer } from './getForestLayer'
import { getProtectedAreaLayer } from './getProtectedAreaLayer'

export const GeoApi = {
  init: (express: Express): void => {
    express.post(
      ApiEndPoint.Geo.Layers.forest(),
      ValidationMiddleware.validateRequest(GeoSchemes.layerSchema),
      GeeAuthMiddleware.requireLogin,
      getForestLayer
    )
    express.post(
      ApiEndPoint.Geo.Layers.forestAgreement(),
      ValidationMiddleware.validateRequest(GeoSchemes.forestAgreementLayerSchema),
      GeeAuthMiddleware.requireLogin,
      getForestAgreementLayer
    )

    express.get(
      ApiEndPoint.Geo.Estimations.forest(),
      ValidationMiddleware.validateRequest(GeoSchemes.forestEstimationsSchema),
      getForestEstimations
    )

    express.post(
      ApiEndPoint.Geo.Estimations.forestAgreement(),
      ValidationMiddleware.validateRequest(GeoSchemes.forestAgreementEstimationSchema),
      GeeAuthMiddleware.requireLogin,
      estimateImageArea
    )

    express.get(ApiEndPoint.Geo.bounds(), ValidationMiddleware.validateRequest(GeoSchemes.countryIsoSchema), getBounds)

    express.get(ApiEndPoint.Geo.Layers.boundaries(), GeeAuthMiddleware.requireLogin, getBoundariesLayer)

    express.post(
      ApiEndPoint.Geo.Layers.protectedArea(),
      ValidationMiddleware.validateRequest(GeoSchemes.layerSchema),
      GeeAuthMiddleware.requireLogin,
      getProtectedAreaLayer
    )

    express.post(
      ApiEndPoint.Geo.Layers.burnedArea(),
      ValidationMiddleware.validateRequest(GeoSchemes.layerSchema),
      GeeAuthMiddleware.requireLogin,
      getBurnedAreaLayer
    )

    express.post(ApiEndPoint.Geo.Estimations.intersectionArea(), GeeAuthMiddleware.requireLogin, estimateIntersectionArea)
  },
}
