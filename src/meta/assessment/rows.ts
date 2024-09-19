import { Cycle } from 'meta/assessment/cycle'
import { Row } from 'meta/assessment/row'

const cloneProps = (props: { cycleSource: Cycle; cycleTarget: Cycle; row: Row }): Row['props'] => {
  const { cycleSource, cycleTarget, row } = props

  const { uuid: cycleSourceUuid } = cycleSource
  const { uuid: cycleTargetUuid } = cycleTarget

  const _props: Row['props'] = { ...row.props }
  _props.cycles.push(cycleTargetUuid)

  if (_props.calculateFn?.[cycleSourceUuid]) _props.calculateFn[cycleTargetUuid] = _props.calculateFn[cycleSourceUuid]
  if (_props.calculateIf?.[cycleSourceUuid]) _props.calculateIf[cycleTargetUuid] = _props.calculateIf[cycleSourceUuid]
  if (_props.chart?.[cycleSourceUuid]) _props.chart[cycleTargetUuid] = _props.chart[cycleSourceUuid]
  if (_props.linkToSection?.[cycleSourceUuid])
    _props.linkToSection[cycleTargetUuid] = _props.linkToSection[cycleSourceUuid]
  if (_props.validateFns?.[cycleSourceUuid]) _props.validateFns[cycleTargetUuid] = _props.validateFns[cycleSourceUuid]
  if (_props.withReview?.[cycleSourceUuid]) _props.withReview[cycleTargetUuid] = _props.withReview[cycleSourceUuid]

  return _props
}

export const Rows = {
  cloneProps,
}
