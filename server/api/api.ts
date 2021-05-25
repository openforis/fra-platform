import { Express } from 'express'

import { BiomassStockApi } from '@server/api/biomassStock'
import { AuthApi } from './auth'
import { DefinitionApi } from './definitions'

/**
 * API Controller
 * Initialize APIs here
 */

export const Api = {
  init: (express: Express): void => {
    AuthApi.init(express)
    DefinitionApi.init(express)

    BiomassStockApi.init(express)
  },
}
