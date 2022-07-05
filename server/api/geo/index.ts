import { ApiEndPoint } from '@common/api/endpoint'
import { Express } from 'express'

import { getForestLayer } from './getForestLayer'

export const GeoApi = {
  init: (express: Express): void => {
    express.get(ApiEndPoint.Geo.Layers.getForest(), getForestLayer)
  },
}
