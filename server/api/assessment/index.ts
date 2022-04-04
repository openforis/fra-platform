import { Express } from 'express'
import { ApiEndPoint } from '@common/api/endpoint'
import { AuthMiddleware } from '@server/middleware/auth'
import { getSections } from './getSections'
import { getOriginalDataPoint } from './getOdp'
import { getCountryStatus } from './getCountryStatus'
import { getCountry } from './getCountry'
import { postCountry } from './postCountry'
import { getTableData } from './getTableData'
import { getSectionMetadata } from './getSectionMetadata'
import { postCountryStatus } from './postCountryStatus'

import { persistNodeValue } from './persistNodeValue'
import { getReservedYears } from './getReservedYears'
import { createOriginalDataPoint } from './createOriginalDataPoint'
import { deleteOriginalDataPoint } from './deleteOriginalDataPoint'
import { updateOriginalDataPoint } from './updateOriginalDataPoint'
import { getOriginalDataPointData } from './getOriginalDataPointData'

export const AssessmentApi = {
  init: (express: Express): void => {
    // Country
    express.get(ApiEndPoint.Assessment.country(), AuthMiddleware.requireView, getCountry)
    express.post(ApiEndPoint.Assessment.country(), AuthMiddleware.requireView, postCountry)

    // CountryStatus
    express.get(ApiEndPoint.Assessment.countryStatus(), AuthMiddleware.requireView, getCountryStatus)
    express.post(ApiEndPoint.Assessment.countryStatus(), AuthMiddleware.requireEdit, postCountryStatus)

    // OriginalDataPoint // entry
    express.get(
      ApiEndPoint.Assessment.OriginalDataPoint.ReservedYears.many(),
      AuthMiddleware.requireView,
      getReservedYears
    )

    express.post(ApiEndPoint.Assessment.OriginalDataPoint.one(), AuthMiddleware.requireEdit, createOriginalDataPoint)
    express.delete(ApiEndPoint.Assessment.OriginalDataPoint.one(), AuthMiddleware.requireEdit, deleteOriginalDataPoint)

    express.get(ApiEndPoint.Assessment.OriginalDataPoint.one(), AuthMiddleware.requireView, getOriginalDataPoint)
    express.put(ApiEndPoint.Assessment.OriginalDataPoint.one(), AuthMiddleware.requireEdit, updateOriginalDataPoint)

    // OriginalDataPoint // table
    express.get(
      ApiEndPoint.Assessment.OriginalDataPoint.TableData.one(),
      AuthMiddleware.requireView,
      getOriginalDataPointData
    )

    // TableData
    express.get(ApiEndPoint.Assessment.TableData.one(), AuthMiddleware.requireView, getTableData)

    express.get(ApiEndPoint.Assessment.TableData.one(), AuthMiddleware.requireView, getTableData)
    express.patch(ApiEndPoint.CycleData.PersistNode.one(), AuthMiddleware.requireEdit, persistNodeValue)

    // Sections
    // requireView: We don't pass table for sections - always allow read
    express.get(ApiEndPoint.Assessment.sections(), AuthMiddleware.requireView, getSections)
    express.get(ApiEndPoint.Assessment.Sections.Metadata.many(), AuthMiddleware.requireView, getSectionMetadata)
  },
}
