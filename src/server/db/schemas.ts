import { Assessment, AssessmentName } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'

const getSchemaAssessment = (assessmentName: AssessmentName): string => {
  return `assessment_${assessmentName}`.toLowerCase()
}

/**
 * @deprecated - use getSchemaAssessment
 */
const getName = (assessment: Pick<Assessment, 'props'>): string => {
  const assessmentName = assessment.props.name
  return getSchemaAssessment(assessmentName)
}

const getNameCycle = (assessment: Pick<Assessment, 'props'>, cycle: Pick<Cycle, 'name'>): string => {
  return `assessment_${assessment.props.name}_${cycle.name}`.toLowerCase()
}

const getSchemaGeo = (): string => `geo`

export const Schemas = {
  getName,
  getNameCycle,
  getSchemaAssessment,
  getSchemaGeo,
}
