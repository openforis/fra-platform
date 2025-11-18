import { Objects } from 'utils/objects'

import { AssessmentBase, AssessmentProps } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'

interface AssessmentDB {
  cycles: Array<Cycle>
  id: number
  props: AssessmentProps
  uuid: string
}

export const AssessmentAdapter = (assessment: AssessmentDB): AssessmentBase => {
  return Objects.camelize(assessment)
}
