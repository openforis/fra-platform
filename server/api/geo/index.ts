import { ApiEndPoint } from '@common/api/endpoint'
import { Express } from 'express'

import { getForestAgrLayer } from './getForestAgrLayer'
import { getForestLayer } from './getForestLayer'

export const GeoApi = {
  init: (express: Express): void => {
    express.get(ApiEndPoint.Geo.Layers.getForest(), getForestLayer)
    express.get(ApiEndPoint.Geo.Layers.getForestAgr(), getForestAgrLayer)
  },
}
