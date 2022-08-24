import { ApiEndPoint } from '@common/api/endpoint'
import { Express } from 'express'

import { getDefition } from './get'

export const DefinitionApi = {
  init: (express: Express): void => {
    express.get(ApiEndPoint.definitions(), getDefition)
  },
}
