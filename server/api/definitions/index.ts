import { Express } from 'express'

import { ApiEndPoint } from '@common/api/endpoint'
import { getDefition } from './get'

export const DefinitionApi = {
  init: (express: Express): void => {
    express.get(ApiEndPoint._Definitions.get(), getDefition)
  },
}
