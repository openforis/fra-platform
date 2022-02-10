import { Express } from 'express'
import { AssessmentGetTableRowsMetaData } from '@server/api/assessment/getTablesRowsWithCols'
import { AssessmentPostCountryStatus } from './postCountryStatus'
import { AssessmentGetSections } from './getSections'
import { AssessmentGetOdp } from './getOdp'
import { AssessmentGetCountryStatus } from './getCountryStatus'
import { AssessmentGetTableData } from './getTableData'
import { AssessmentGetTablesMetaData } from './getTablesMetadata'

export const AssessmentApi = {
  init: (express: Express): void => {
    AssessmentGetSections.init(express)
    AssessmentGetTableData.init(express)
    AssessmentGetTablesMetaData.init(express)
    AssessmentGetTableRowsMetaData.init(express)
    AssessmentGetOdp.init(express)
    AssessmentGetCountryStatus.init(express)

    AssessmentPostCountryStatus.init(express)
  },
}
