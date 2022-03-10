import { Express } from 'express'
import { ApiEndPoint } from '@common/api/endpoint'
import { AuthMiddleware } from '@server/middleware/auth'
import { getSections } from './getSections'
import { getOriginalDataPoint } from './getOdp'
import { getCountryStatus } from './getCountryStatus'
import { getTableData } from './getTableData'
import { getSectionMetadata } from './getSectionMetadata'
import { postCountryStatus } from './postCountryStatus'

import { persistNodeValue } from './persistNodeValue'
import { getReservedYears } from './getReservedYears'
import { createOriginalDataPoint } from './createOriginalDataPoint'
import { deleteOriginalDataPoint } from './deleteOriginalDataPoint'
import { updateOriginalDataPoint } from './updateOriginalDataPoint'

export const AssessmentApi = {
  init: (express: Express): void => {
    // CountryStatus
    express.get(ApiEndPoint.Assessment.countryStatus(), AuthMiddleware.requireView, getCountryStatus)
    express.post(ApiEndPoint.Assessment.countryStatus(), AuthMiddleware.requireEdit, postCountryStatus)

    // OriginalDataPoint
    express.get(
      ApiEndPoint.Assessment.OriginalDataPoint.ReservedYears.many(),
      AuthMiddleware.requireView,
      getReservedYears
    )

    express.post(ApiEndPoint.Assessment.OriginalDataPoint.one(), AuthMiddleware.requireEdit, createOriginalDataPoint)
    express.delete(ApiEndPoint.Assessment.OriginalDataPoint.one(), AuthMiddleware.requireEdit, deleteOriginalDataPoint)

    express.get(ApiEndPoint.Assessment.OriginalDataPoint.one(), AuthMiddleware.requireView, getOriginalDataPoint)
    express.put(ApiEndPoint.Assessment.OriginalDataPoint.one(), AuthMiddleware.requireEdit, updateOriginalDataPoint)

    // TableData
    express.get(ApiEndPoint.Assessment.TableData.one(), AuthMiddleware.requireView, getTableData)

    express.get(ApiEndPoint.Assessment.TableData.one(), AuthMiddleware.requireView, getTableData)
    express.patch(ApiEndPoint.CycleData.PersistNode.one(), AuthMiddleware.requireEdit, persistNodeValue)

    // Sections
    express.get(ApiEndPoint.Assessment.sections(), AuthMiddleware.requireView, getSections)
    express.get(ApiEndPoint.Assessment.Sections.Metadata.many(), AuthMiddleware.requireView, getSectionMetadata)
  },
}
