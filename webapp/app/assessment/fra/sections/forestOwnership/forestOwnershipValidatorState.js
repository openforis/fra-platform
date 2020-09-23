import * as R from 'ramda'

import * as NumberUtils from '@common/bignumberUtils'
import * as FRA from '@common/assessment/fra'

import * as AssessmentStateValidator from '@webapp/app/assessment/assessmentStateValidator'
import * as ForestOwnershipState from '@webapp/app/assessment/fra/sections/forestOwnership/forestOwnershipState'

const section = FRA.sections['4'].children.a

const rowsPrivateOwnership = R.range(1, 4)

export const privateOwnershipValidator = AssessmentStateValidator.subCategoryValidator(
  FRA.type,
  section.name,
  section.tables.forestOwnership,
  0,
  rowsPrivateOwnership
)

export const otherOrUnknownValidator = (colIdx) => (state) => {
  const value = ForestOwnershipState.getOtherOrUnknown(colIdx)(state)
  return R.isNil(value) || NumberUtils.greaterThanOrEqualTo(value, 0)
}

export const getValidationMessages = (data) => (state) => {
  const colNo = data[0].length
  const messages = []

  for (let colIdx = 0; colIdx < colNo; colIdx += 1) {
    const colMessages = []
    messages.push(colMessages)

    for (let rowIdx = 1; rowIdx < rowsPrivateOwnership[rowsPrivateOwnership.length - 1]; rowIdx += 1) {
      if (!privateOwnershipValidator(colIdx, rowIdx)(state)) {
        colMessages.push({ key: 'generalValidation.subCategoryExceedsParent' })
        break
      }
    }

    if (!otherOrUnknownValidator(colIdx)(state)) {
      colMessages.push({ key: 'generalValidation.valueMustBePositive' })
    }
  }

  return messages
}
