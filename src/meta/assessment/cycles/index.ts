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

const getPreviousAndSelfCycles = (props: { assessment: Assessment; cycle: Cycle }): Array<Cycle> => {
  const { assessment, cycle } = props
  const result: Array<Cycle> = []
  let current: Cycle | undefined = cycle
  while (current) {
    result.unshift(current)
    current = getPreviousCycle({ assessment, cycle: current })
  }
  return result
}

const compareByDateCreated = (cycleA: Cycle | undefined, cycleB: Cycle | undefined): number => {
  const dateCreatedA = cycleA?.props.dateCreated
  const dateCreatedB = cycleB?.props.dateCreated
  if (dateCreatedA && dateCreatedB) {
    return new Date(dateCreatedB).getTime() - new Date(dateCreatedA).getTime()
  }
  if (dateCreatedA) return -1
  if (dateCreatedB) return 1
  return 0
}

const compareByDate = (cycleA: Cycle | undefined, cycleB: Cycle | undefined): number => {
  const dateEditingA = cycleA?.props.dateEditing
  const dateEditingB = cycleB?.props.dateEditing
  if (dateEditingA && dateEditingB) {
    return new Date(dateEditingB).getTime() - new Date(dateEditingA).getTime()
  }

  return compareByDateCreated(cycleA, cycleB)
}

export const Cycles = {
  compareByDate,
  compareByDateCreated,
  isPublished,
  getPreviousCycle,
  getPreviousAndSelfCycles,
}
