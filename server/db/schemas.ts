import { Assessment } from '@core/meta/assessment'

const getName = (assessment: Assessment): string => {
  return `assessment_${assessment.props.name}`
}

export const Schemas = {
  getName,
}
