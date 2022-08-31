import { Express } from 'express'

import { ApiEndPoint } from '@meta/api/endpoint'

import { getBoundariesLayer } from './getBoundariesLayer'
import { getForestAgreementLayer } from './getForestAgreementLayer'
import { getForestLayer } from './getForestLayer'

export const GeoApi = {
  init: (express: Express): void => {
    express.get(ApiEndPoint.Geo.Layers.getForest(), getForestLayer)
    express.get(ApiEndPoint.Geo.Layers.getForestAgreement(), getForestAgreementLayer)
    express.get(ApiEndPoint.Geo.Layers.getBoundaries(), getBoundariesLayer)
  },
}
