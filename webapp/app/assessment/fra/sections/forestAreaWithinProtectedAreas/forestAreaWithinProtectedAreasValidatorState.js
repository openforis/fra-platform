import * as FRA from '@common/assessment/fra'

import * as AssessmentStateValidator from '@webapp/app/assessment/assessmentStateValidator'

const section = FRA.sections['3'].children.b

export const protectedAreaValidator = AssessmentStateValidator.subCategoryValidator(
  FRA.type,
  section.name,
  section.tables.forestAreaWithinProtectedAreas,
  1,
  [2]
)

export const getValidationMessages = data => state => {
  const colNo = data[0].length
  const messages = []

  for (let colIdx = 0; colIdx < colNo; colIdx += 1) {
    const colMessages = []
    messages.push(colMessages)

    for (let rowIdx = 0; rowIdx < data.length; rowIdx += 1) {
      if (!protectedAreaValidator(colIdx, rowIdx)(state)) {
        colMessages.push({ key: 'generalValidation.subCategoryExceedsParent' })
        break
      }
    }
  }

  return messages
}
