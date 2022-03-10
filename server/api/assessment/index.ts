import { Express } from 'express'
import { ApiEndPoint } from '@common/api/endpoint'
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
    express.get(ApiEndPoint.Assessment.sections(), getSections)
    express.get(ApiEndPoint.Assessment.TableData.one(), getTableData)
    express.get(ApiEndPoint.Assessment.Sections.Metadata.many(), getSectionMetadata)
    express.get(ApiEndPoint.Assessment.OriginalDataPoint.one(), getOriginalDataPoint)
    express.get(ApiEndPoint.Assessment.countryStatus(), getCountryStatus)
    express.post(ApiEndPoint.Assessment.countryStatus(), postCountryStatus)

    // OriginalDataPoint
    express.get(ApiEndPoint.Assessment.OriginalDataPoint.ReservedYears.many(), getReservedYears)
    express.post(ApiEndPoint.Assessment.OriginalDataPoint.one(), createOriginalDataPoint)
    express.delete(ApiEndPoint.Assessment.OriginalDataPoint.one(), deleteOriginalDataPoint)
    express.put(ApiEndPoint.Assessment.OriginalDataPoint.one(), updateOriginalDataPoint)

    // TableData
    express.get(ApiEndPoint.Assessment.TableData.one(), getTableData)
    express.patch(ApiEndPoint.CycleData.PersistNode.one(), persistNodeValue)
  },
}
