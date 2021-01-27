// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import * as FRA from '@common/assessment/fra'

import * as AssessmentStateValidator from '@webapp/app/assessment/assessmentStateValidator'

const section = FRA.sections['1'].children.c

export const positiveOrZeroValidator = AssessmentStateValidator.positiveOrZeroValidator(
  FRA.type,
  section.name,
  section.tables.annualReforestation
)

export const getValidationMessages = (data: any) => (state: any) => {
  const colNo = data[0].length
  const messages = []

  for (let colIdx = 0; colIdx < colNo; colIdx += 1) {
    const colMessages: any = []
    messages.push(colMessages)

    if (!positiveOrZeroValidator(colIdx, 0)(state)) {
      colMessages.push({ key: 'generalValidation.valueMustBePositive' })
    }
  }

  return messages
}
