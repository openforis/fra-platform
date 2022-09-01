import { Express } from 'express'

import { ApiEndPoint } from '@meta/api/endpoint'

import { getDefition } from './get'

export const DefinitionApi = {
  init: (express: Express): void => {
    express.get(ApiEndPoint.definitions(), getDefition)
  },
}
