import { Express } from 'express'
import { AssessmentPostCountryStatus } from './postCountryStatus'
import { AssessmentGetSections } from './getSections'
import { AssessmentGetOdp } from './getOdp'
import { AssessmentGetCountryStatus } from './getCountryStatus'

export const AssessmentApi = {
  init: (express: Express): void => {
    AssessmentGetSections.init(express)
    AssessmentGetOdp.init(express)
    AssessmentGetCountryStatus.init(express)

    AssessmentPostCountryStatus.init(express)
  },
}
