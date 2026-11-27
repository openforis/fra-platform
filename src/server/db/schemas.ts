import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'

const getSchemaAssessmentCycle = (props: { assessmentName: AssessmentName; cycleName: CycleName }): string => {
  const { assessmentName, cycleName } = props
  return `assessment_${assessmentName}_${cycleName}`.toLowerCase()
}

const getSchemaAssessment = (props: { assessmentName: AssessmentName }): string => {
  const { assessmentName } = props
  return `assessment_${assessmentName}`.toLowerCase()
}

const getSchemaGeo = (): string => `geo`

export const Schemas = {
  getSchemaAssessmentCycle,
  getSchemaAssessment,
  getSchemaGeo,
}
