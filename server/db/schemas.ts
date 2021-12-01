import { Assessment } from '@core/meta/assessment/assessment'

const getName = (assessment: Pick<Assessment, 'props'>): string => {
  return `assessment_${assessment.props.name}`
}

export const Schemas = {
  getName,
}
