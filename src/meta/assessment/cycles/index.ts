import { Assessment } from 'meta/assessment/assessment'
import { Assessments } from 'meta/assessment/assessments'
import { Cycle, CycleStatus } from 'meta/assessment/cycle'

const isPublished = (cycle: Cycle): boolean => {
  return cycle.props.status === CycleStatus.published
}

const getPreviousCycle = (props: { assessment: Assessment; cycle: Cycle }): Cycle | undefined => {
  const { assessment, cycle } = props
  return Assessments.getCycle({ assessment, cycleUuid: cycle.cycleUuidSource })
}

export const Cycles = {
  isPublished,
  getPreviousCycle,
}
