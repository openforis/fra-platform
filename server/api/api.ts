import { Express } from 'express'

import { DataExportApi } from '@server/api/dataExport'
import { GrowingStockApi } from '@server/api/growingStock'
import { CollaboratorsApi } from '@server/api/collaborators'
import { CountryApi } from '@server/api/country'
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

    CollaboratorsApi.init(express)

    CountryApi.init(express)

    BiomassStockApi.init(express)
    GrowingStockApi.init(express)
  },
}
