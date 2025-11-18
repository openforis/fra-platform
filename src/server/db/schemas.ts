import { Assessment, AssessmentName } from 'meta/assessment/assessment'
import { Cycle, CycleName } from 'meta/assessment/cycle'

const getSchemaAssessmentCycle = (assessmentName: AssessmentName, cycleName: CycleName): string => {
  return `assessment_${assessmentName}_${cycleName}`.toLowerCase()
}

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

/**
 * @deprecated - use getSchemaAssessmentCycle
 */
const getNameCycle = (assessment: Pick<Assessment, 'props'>, cycle: Pick<Cycle, 'name'>): string => {
  return getSchemaAssessmentCycle(assessment.props.name, cycle.name)
}

const getSchemaGeo = (): string => `geo`

export const Schemas = {
  getName,
  getNameCycle,
  getSchemaAssessmentCycle,
  getSchemaAssessment,
  getSchemaGeo,
}
