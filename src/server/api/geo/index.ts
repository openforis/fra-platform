import { Express } from 'express'

import { ApiEndPoint } from '@meta/api/endpoint'

import { checkGeeAuthentication } from '@server/middleware/geeAuth'

import { getBoundariesLayer } from './getBoundariesLayer'
import { getForestAgreementLayer } from './getForestAgreementLayer'
import { getForestLayer } from './getForestLayer'

export const GeoApi = {
  init: (express: Express): void => {
    express.get(ApiEndPoint.Geo.Layers.getForest(), checkGeeAuthentication, getForestLayer)
    express.get(ApiEndPoint.Geo.Layers.getForestAgreement(), checkGeeAuthentication, getForestAgreementLayer)
    express.get(ApiEndPoint.Geo.Layers.getBoundaries(), checkGeeAuthentication, getBoundariesLayer)
  },
}
