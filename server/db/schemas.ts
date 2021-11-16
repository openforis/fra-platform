import { Assessment } from '@core/meta/assessment'

const getName = (assessment: Pick<Assessment, 'props'>): string => {
  return `assessment_${assessment.props.name}`
}

export const Schemas = {
  getName,
}
