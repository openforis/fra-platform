import { Assessment } from 'meta/assessment/assessment'
import { Assessments } from 'meta/assessment/assessments'
import { Cycle, CycleStatus } from 'meta/assessment/cycle'

const getNDPDataSourcesVersion = (props: { cycle: Cycle }): Cycle['props']['ndp']['dataSources']['version'] => {
  const { cycle } = props
  return cycle.props.ndp?.dataSources?.version ?? 1
}

const getPreviousCycle = (props: { assessment: Assessment; cycle: Cycle }): Cycle | undefined => {
  const { assessment, cycle } = props
  return Assessments.getCycle({ assessment, cycleUuid: cycle.cycleUuidSource })
}

const isPublished = (cycle: Cycle): boolean => {
  return cycle.props.status === CycleStatus.published
}

export const Cycles = {
  getNDPDataSourcesVersion,
  getPreviousCycle,
  isPublished,
}
