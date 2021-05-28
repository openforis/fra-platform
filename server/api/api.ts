import { Express } from 'express'

import { DataExportApi } from '@server/api/dataExport'
import { GrowingStockApi } from '@server/api/growingStock'
import { CollaboratorsApi } from '@server/api/collaborators'
import { CountryApi } from '@server/api/country'
import { AssessmentApi } from '@server/api/assessment'
import { AuditApi } from '@server/api/audit'
import { DescriptionsApi } from '@server/api/descriptions'
import { CountryMessageBoardApi } from '@server/api/countryMessageBoard'
import { VersioningApi } from '@server/api/versioning'
import { ReviewApi } from '@server/api/review'
import { TraditionalTableApi } from '@server/api/traditionalTable'
import { UserChatApi } from '@server/api/userChat'
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
    DefinitionApi.init(express)

    AuthApi.init(express)

    AuditApi.init(express)
    DescriptionsApi.init(express)
    ReviewApi.init(express)

    CountryMessageBoardApi.init(express)
    UserChatApi.init(express)

    VersioningApi.init(express)

    LandingApi.init(express)
    StatisticalFactsheetsApi.init(express)
    DataExportApi.init(express)

    CollaboratorsApi.init(express)

    CountryApi.init(express)
    AssessmentApi.init(express)

    TraditionalTableApi.init(express)

    BiomassStockApi.init(express)
    GrowingStockApi.init(express)
  },
}
