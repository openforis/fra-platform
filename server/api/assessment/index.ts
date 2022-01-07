import { Express } from 'express'
import { AssessmentGetSections } from './getSections'

export const AssessmentApi = {
  init: (express: Express): void => {
    AssessmentGetSections.init(express)
  },
}
