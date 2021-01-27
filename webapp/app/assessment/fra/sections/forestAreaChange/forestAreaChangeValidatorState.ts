// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'ramd... Remove this comment to see the full error message
import * as R from 'ramda'
// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import * as FRA from '@common/assessment/fra'

import * as AssessmentStateValidator from '@webapp/app/assessment/assessmentStateValidator'

const section = FRA.sections['1'].children.c

export const forestExpansionValidator = AssessmentStateValidator.subCategoryValidator(
  FRA.type,
  section.name,
  section.tables.forestAreaChange,
  0,
  R.range(1, 3)
)

export const positiveOrZeroValidator = AssessmentStateValidator.positiveOrZeroValidator(
  FRA.type,
  section.name,
  section.tables.forestAreaChange
)

export const getValidationMessages = (data: any) => (state: any) => {
  const colNo = data[0].length
  const messages = []

  for (let colIdx = 0; colIdx < colNo; colIdx += 1) {
    const colMessages: any = []
    messages.push(colMessages)

    if (!positiveOrZeroValidator(colIdx, 0)(state) || !positiveOrZeroValidator(colIdx, 3)(state)) {
      colMessages.push({ key: 'generalValidation.valueMustBePositive' })
    }
    if (!forestExpansionValidator(colIdx, 1)(state) || !forestExpansionValidator(colIdx, 2)(state)) {
      colMessages.push({ key: 'generalValidation.subCategoryExceedsParent' })
    }
  }

  return messages
}
