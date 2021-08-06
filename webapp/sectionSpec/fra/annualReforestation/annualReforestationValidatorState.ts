import { FRA } from '@core/assessment'

import * as AssessmentStateValidator from '@webapp/app/assessment/assessmentStateValidator'

const section = FRA.sections['1'].children.c

export const positiveOrZeroValidator = AssessmentStateValidator.positiveOrZeroValidator(
  FRA.type,
  section.name,
  // TODO: FIX THIS
  // @ts-ignore
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
