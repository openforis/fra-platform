import { Assessment, Cycle } from '@meta/assessment'

const getName = (assessment: Pick<Assessment, 'props'>): string => {
  return `assessment_${assessment.props.name}`
}

const getNameCycle = (assessment: Pick<Assessment, 'props'>, cycle: Cycle): string => {
  return `assessment_${assessment.props.name}_${cycle.name}`
}

const getAssessmentSchema = (assessmentName: string): string => `assessment_${assessmentName}`

const getCycleSchema = (assessmentName: string, cycleName: string): string =>
  `assessment_${assessmentName}_${cycleName}`

export const Schemas = {
  getName,
  getNameCycle,
  getAssessmentSchema,
  getCycleSchema,
}
