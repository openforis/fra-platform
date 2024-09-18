import { Cycle, CycleStatus } from './cycle'

const isPublished = (cycle: Cycle): boolean => {
  return cycle.props.status === CycleStatus.published
}

export const Cycles = {
  isPublished,
}
