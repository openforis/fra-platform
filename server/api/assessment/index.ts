import { Express } from 'express'
import { AssessmentPostCountryStatus } from './postCountryStatus'
import { AssessmentGetSections } from './getSections'
import { AssessmentGetOdp } from './getOdp'
import { AssessmentGetCountryStatus } from './getCountryStatus'
import { AssessmentGetTableData } from './getTableData'
import { AssessmentGetSectionMetadata } from './getSectionMetadata'

export const AssessmentApi = {
  init: (express: Express): void => {
    AssessmentGetSections.init(express)
    AssessmentGetTableData.init(express)
    AssessmentGetSectionMetadata.init(express)
    AssessmentGetOdp.init(express)
    AssessmentGetCountryStatus.init(express)

    AssessmentPostCountryStatus.init(express)
  },
}
