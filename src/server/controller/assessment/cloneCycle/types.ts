import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'

export type CloneProps = {
  assessment: Assessment
  cycleSource: Cycle
  cycleTarget: Cycle
}
