import { Express } from 'express'

import { ApiEndPoint } from 'meta/api/endpoint'

import { getHealth } from 'server/api/health/getHealth'

export const HealthApi = {
  init: (express: Express): void => {
    express.get(ApiEndPoint.health(), getHealth)
  },
}
