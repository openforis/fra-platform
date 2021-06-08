import { Express } from 'express'

import { DefinitionGet } from './get'

export const DefinitionApi = {
  init: (express: Express): void => {
    DefinitionGet.init(express)
  },
}
