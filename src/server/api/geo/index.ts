import { Express } from 'express'

import { ApiEndPoint } from '@meta/api/endpoint'

import { GeeAuthMiddleware } from '@server/middleware/geeAuth'
import { ValidationMiddleware } from '@server/middleware/validation'
import { GeoSchemes } from '@server/middleware/validation/geoSchemes'

import { getBoundariesLayer } from './getBoundariesLayer'
import { getForestAgreementLayer } from './getForestAgreementLayer'
import { getForestLayer } from './getForestLayer'

export const GeoApi = {
  init: (express: Express): void => {
    express.get(
      ApiEndPoint.Geo.Layers.getForest(),
      ValidationMiddleware.validateRequest(GeoSchemes.forestLayerSchema),
      GeeAuthMiddleware.requireLogin,
      getForestLayer
    )
    express.get(ApiEndPoint.Geo.Layers.getForestAgreement(), GeeAuthMiddleware.requireLogin, getForestAgreementLayer)
    express.get(ApiEndPoint.Geo.Layers.getBoundaries(), GeeAuthMiddleware.requireLogin, getBoundariesLayer)
  },
}
