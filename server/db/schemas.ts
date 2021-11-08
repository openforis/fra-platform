import { Assessment } from '@core/meta/assessment'

const getName = (assessment: Assessment): string => {
  return `assessment_${assessment.id}`
}

export const Schemas = {
  getName,
}
