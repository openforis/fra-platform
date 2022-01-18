import { Express } from 'express'
import { AssessmentGetSections } from './getSections'
import { AssessmentGetOdp } from './getOdp'

export const AssessmentApi = {
  init: (express: Express): void => {
    AssessmentGetSections.init(express)
    AssessmentGetOdp.init(express)
  },
}
