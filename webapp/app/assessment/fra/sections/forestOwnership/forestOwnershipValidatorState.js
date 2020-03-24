import * as R from 'ramda'

import * as FRA from '@common/assessment/fra'

import * as AssessmentStateValidator from '@webapp/app/assessment/assessmentStateValidator'

const section = FRA.sections['4'].children.a

const rowsPrivateOwnership = R.range(1, 4)

export const privateOwnershipValidator = AssessmentStateValidator.subCategoryValidator(
  FRA.type,
  section.name,
  section.tables.forestOwnership,
  0,
  rowsPrivateOwnership
)

export const getValidationMessages = data => state => {
  const colNo = data[0].length
  const messages = []

  for (let colIdx = 0; colIdx < colNo; colIdx += 1) {
    const colMessages = []
    messages.push(colMessages)

    for (let rowIdx = 1; rowIdx < rowsPrivateOwnership; rowIdx += 1) {
      if (!privateOwnershipValidator(colIdx, rowIdx)(state)) {
        colMessages.push({ key: 'generalValidation.subCategoryExceedsParent' })
        break
      }
    }
  }

  return messages
}
