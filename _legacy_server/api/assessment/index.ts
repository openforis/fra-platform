import { Express } from 'express'
import { AssessmentCreateEmail } from './createEmail'
import { AssessmentExport } from './export'

export const AssessmentApi = {
  init: (express: Express): void => {
    AssessmentExport.init(express)
    AssessmentCreateEmail.init(express)
  },
}
