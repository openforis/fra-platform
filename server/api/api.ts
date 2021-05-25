import { Express } from 'express'

import { DataExportApi } from '@server/api/dataExport'
import { BiomassStockApi } from './biomassStock'
import { StatisticalFactsheetsApi } from './statisticalFactsheets'
import { AuthApi } from './auth'
import { DefinitionApi } from './definitions'
import { LandingApi } from './landing'

/**
 * API Controller
 * Initialize APIs here
 */

export const Api = {
  init: (express: Express): void => {
    AuthApi.init(express)
    DefinitionApi.init(express)

    LandingApi.init(express)
    StatisticalFactsheetsApi.init(express)
    DataExportApi.init(express)

    BiomassStockApi.init(express)
  },
}
