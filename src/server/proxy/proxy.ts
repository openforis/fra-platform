import { Express } from 'express'
import { ApiEndPoint } from 'meta/api/endpoint'
import { sepalProxy } from 'server/proxy/sepalProxy'

export const Proxy = {
  init: (express: Express): void => {
    express.use(ApiEndPoint.Geo.sepalProxy(), sepalProxy)
  },
}
