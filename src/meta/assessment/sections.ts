import { Cycle } from 'meta/assessment/cycle'
import { Section } from 'meta/assessment/section'

const cloneProps = (props: { cycleSource: Cycle; cycleTarget: Cycle; section: Section }): Section['props'] => {
  const { cycleSource, cycleTarget, section } = props

  const { uuid: cycleSourceUuid } = cycleSource
  const { uuid: cycleTargetUuid } = cycleTarget

  const _props: Section['props'] = { ...section.props }
  _props.cycles.push(cycleTargetUuid)

  if (_props.anchors?.[cycleSourceUuid]) _props.anchors[cycleTargetUuid] = _props.anchors[cycleSourceUuid]
  if (_props.labels?.[cycleSourceUuid]) _props.labels[cycleTargetUuid] = _props.labels[cycleSourceUuid]

  return _props
}

export const Sections = {
  cloneProps,
}
