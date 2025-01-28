import { Express } from 'express'

import { ApiEndPoint } from 'meta/api/endpoint'

import { getLatestActivities } from './getLatestActivities'

export const KioskApi = {
  init: (express: Express): void => {
    express.get(ApiEndPoint.Kiosk.latestActivities(), getLatestActivities)
  },
}
