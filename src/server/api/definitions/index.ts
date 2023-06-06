import { Express } from 'express'

import { ApiEndPoint } from 'meta/api/endpoint'

import { getDefinition } from './get'

export const DefinitionApi = {
  init: (express: Express): void => {
    express.get(ApiEndPoint.definitions(), getDefinition)
  },
}
