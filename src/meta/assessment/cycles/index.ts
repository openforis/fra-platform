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

const isYearly = (cycle: Cycle): boolean => !Number.isNaN(Number(cycle.name))

const getFirstYearlyCycle = (props: { assessment: Assessment; cycle: Cycle }): Cycle => {
  const { assessment, cycle } = props
  return assessment.cycles.reduce<Cycle>((current) => {
    // Returns self if it's a yearly cycle
    if (isYearly(current) || !current.cycleUuidSource) return current
    return getPreviousCycle({ assessment, cycle: current })
  }, cycle)
}

const isPublished = (cycle: Cycle): boolean => {
  return cycle.props.status === CycleStatus.published
}

export const Cycles = {
  getFirstYearlyCycle,
  getNDPDataSourcesVersion,
  getPreviousCycle,
  isPublished,
}
