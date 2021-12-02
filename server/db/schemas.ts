import { Assessment, Cycle } from '@core/meta/assessment'

const getName = (assessment: Pick<Assessment, 'props'>): string => {
  return `assessment_${assessment.props.name}`
}

const getNameCycle = (assessment: Pick<Assessment, 'props'>, cycle: Cycle): string => {
  return `assessment_${assessment.props.name}_${cycle.name}`
}

export const Schemas = {
  getName,
  getNameCycle,
}
