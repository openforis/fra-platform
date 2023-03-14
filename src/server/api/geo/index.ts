import { Express } from 'express'

import { ApiEndPoint } from '@meta/api/endpoint'

import { GeeAuthMiddleware } from '@server/middleware/geeAuth'
import { ValidationMiddleware } from '@server/middleware/validation'
import { GeoSchemes } from '@server/middleware/validation/geoSchemes'

import { getBoundariesLayer } from './getBoundariesLayer'
import { getBounds } from './getBounds'
import { getForestAgreementLayer } from './getForestAgreementLayer'
import { estimateForestAgreementArea, getForestEstimations } from './getForestEstimations'
import { getForestLayer } from './getForestLayer'
import { getProtectedAreaLayer } from './getProtectedAreaLayer'

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
      ApiEndPoint.Geo.Estimations.forest(),
      ValidationMiddleware.validateRequest(GeoSchemes.forestEstimationsSchema),
      getForestEstimations
    )

    express.get(
      ApiEndPoint.Geo.Estimations.forestAgreement(),
      ValidationMiddleware.validateRequest(GeoSchemes.forestAgreementEstimationSchema),
      GeeAuthMiddleware.requireLogin,
      estimateForestAgreementArea
    )

    express.post(
      ApiEndPoint.Geo.Layers.protectedArea(),
      ValidationMiddleware.validateRequest(GeoSchemes.protectedAreaLayerSchema),
      GeeAuthMiddleware.requireLogin,
      getProtectedAreaLayer
    )

    express.get(ApiEndPoint.Geo.bounds(), ValidationMiddleware.validateRequest(GeoSchemes.countryIsoSchema), getBounds)

    express.get(ApiEndPoint.Geo.Layers.boundaries(), GeeAuthMiddleware.requireLogin, getBoundariesLayer)
  },
}
