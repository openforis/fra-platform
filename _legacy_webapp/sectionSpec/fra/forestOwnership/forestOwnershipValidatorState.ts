import * as R from 'ramda'

import { Numbers } from '@core/utils/numbers'
import { FRA } from '@core/assessment'

import * as AssessmentStateValidator from '../../../app/assessment/assessmentStateValidator'
import * as ForestOwnershipState from '../../../sectionSpec/fra/forestOwnership/forestOwnershipState'

const section = FRA.sections['4'].children.a

const rowsPrivateOwnership = R.range(1, 4)

export const privateOwnershipValidator = AssessmentStateValidator.subCategoryValidator(
  FRA.type,
  section.name,
  section.tables.forestOwnership,
  0,
  rowsPrivateOwnership
)

export const otherOrUnknownValidator = (colIdx: any) => (state: any) => {
  const value = ForestOwnershipState.getOtherOrUnknown(colIdx)(state)
  return R.isNil(value) || Numbers.greaterThanOrEqualTo(value, 0)
}

export const getValidationMessages = (data: any) => (state: any) => {
  const colNo = data[0].length
  const messages = []

  for (let colIdx = 0; colIdx < colNo; colIdx += 1) {
    const colMessages: any = []
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
