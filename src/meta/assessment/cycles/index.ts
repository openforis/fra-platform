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

const getPreviousCycles = (props: { assessment: Assessment; cycle: Cycle }): Array<Cycle> => {
  const { assessment, cycle } = props
  const result: Array<Cycle> = []
  let current: Cycle | undefined = cycle
  while (current) {
    result.unshift(current)
    current = getPreviousCycle({ assessment, cycle: current })
  }
  return result
}

export const Cycles = {
  isPublished,
  getPreviousCycle,
  getPreviousCycles,
}
