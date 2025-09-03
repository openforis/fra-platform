import { AssessmentBase } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'

export type CloneProps = {
  assessment: AssessmentBase
  cycleSource: Cycle
  cycleTarget: Cycle
}
