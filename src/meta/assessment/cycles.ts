import { Assessment } from './assessment'
import { Cycle, CycleStatus } from './cycle'

const isPublished = (cycle: Cycle): boolean => {
  return cycle.props.status === CycleStatus.published
}

const getPreviousCycle = (props: { assessment: Assessment; cycle: Cycle }): Cycle | undefined => {
  const { assessment, cycle } = props
  return assessment.cycles.find((c) => c.uuid === cycle.cycleUuidSource)
}

export const Cycles = {
  isPublished,
  getPreviousCycle,
}
