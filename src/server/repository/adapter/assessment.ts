import { Objects } from 'utils/objects'

import { Assessment, AssessmentProps } from 'meta/assessment/assessment'

interface AssessmentDB {
  id: number
  uuid: string
  props: AssessmentProps
}

export const AssessmentAdapter = (assessment: AssessmentDB): Assessment => {
  return Objects.camelize(assessment)
}
