import { Express } from 'express'
import { ApiEndPoint } from '@common/api/endpoint'
import { getSections } from './getSections'
import { getOriginalDataPoint } from './getOdp'
import { getCountryStatus } from './getCountryStatus'
import { getTableData } from './getTableData'
import { getSectionMetadata } from './getSectionMetadata'
import { postCountryStatus } from './postCountryStatus'

export const AssessmentApi = {
  init: (express: Express): void => {
    express.get(ApiEndPoint.Assessment.sections(), getSections)
    express.get(ApiEndPoint.Assessment.TableData.one(), getTableData)
    express.get(ApiEndPoint.Assessment.Sections.Metadata.many(), getSectionMetadata)
    express.get(ApiEndPoint.Assessment.OriginalDataPoint.one(), getOriginalDataPoint)
    express.get(ApiEndPoint.Assessment.countryStatus(), getCountryStatus)
    express.post(ApiEndPoint.Assessment.countryStatus(), postCountryStatus)
  },
}
