import { Express } from 'express'

import { ApiEndPoint } from 'meta/api/endpoint'

import { init } from 'server/api/init/init'

import { getAssessment } from './getAssessment'

export const InitApi = {
  init: (express: Express): void => {
    express.get(ApiEndPoint.init(), init)

    express.get(ApiEndPoint.Assessment.one(), getAssessment)
  },
}
