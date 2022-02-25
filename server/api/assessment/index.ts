import { Express } from 'express'
import { ApiEndPoint } from '@common/api/endpoint'
import { AssessmentPostCountryStatus } from './postCountryStatus'
import { AssessmentGetSections } from './getSections'
import { AssessmentGetOdp } from './getOdp'
import { AssessmentGetCountryStatus } from './getCountryStatus'
import { getTableData } from './getTableData'
import { AssessmentGetSectionMetadata } from './getSectionMetadata'
import { getReservedYears } from './getReservedYears'
import { updateOriginalDataPoint } from './updateOriginalDataPoint'

export const AssessmentApi = {
  init: (express: Express): void => {
    AssessmentGetSections.init(express)
    AssessmentGetSectionMetadata.init(express)
    AssessmentGetOdp.init(express)
    AssessmentGetCountryStatus.init(express)

    AssessmentPostCountryStatus.init(express)
    // OriginalDataPoint
    express.get(ApiEndPoint.Assessment.OriginalDataPoint.ReservedYears.many(), getReservedYears)
    express.put(ApiEndPoint.Assessment.OriginalDataPoint.one(), updateOriginalDataPoint)

    // TableData
    express.get(ApiEndPoint.Assessment.TableData.one(), getTableData)
    // TODO: express.put(ApiEndPoint.Assessment.TableData.one(), updateTableData)
  },
}
