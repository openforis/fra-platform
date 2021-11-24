import * as R from 'ramda'

import { FRA } from '@core/assessment'

import * as AssessmentStateValidator from '../../../app/assessment/assessmentStateValidator'

const section = FRA.sections['7'].children.a

export const genderSubCategoryValidator = AssessmentStateValidator.subCategoryValidator(
  FRA.type,
  section.name,
  section.tables.employment,
  0,
  R.range(1, 5)
)

export const getValidationMessages = (data: any) => (state: any) => {
  const colNo = data[0].length
  const messages = []

  for (let colIdx = 0; colIdx < colNo; colIdx += 1) {
    const colMessages: any = []
    messages.push(colMessages)

    for (let rowIdx = 1; rowIdx < data.length; rowIdx += 1) {
      if (!genderSubCategoryValidator(colIdx, rowIdx)(state)) {
        colMessages.push({ key: 'generalValidation.subCategoryExceedsParent' })
        break
      }
    }
  }

  return messages
}
