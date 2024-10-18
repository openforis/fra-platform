import { Objects } from 'utils/objects'

import { Cycle } from 'meta/assessment/cycle'
import { Section } from 'meta/assessment/section'

const cloneProps = (props: { cycleSource: Cycle; cycleTarget: Cycle; section: Section }): Section['props'] => {
  const { cycleSource, cycleTarget, section } = props

  const { uuid: cycleSourceUuid } = cycleSource
  const { uuid: cycleTargetUuid } = cycleTarget

  const _props: Section['props'] = Objects.cloneDeep(section.props)
  _props.cycles.push(cycleTargetUuid)

  if (!Objects.isNil(_props.anchors?.[cycleSourceUuid]))
    _props.anchors[cycleTargetUuid] = Objects.cloneDeep(_props.anchors[cycleSourceUuid])
  if (!Objects.isNil(_props.labels?.[cycleSourceUuid]))
    _props.labels[cycleTargetUuid] = Objects.cloneDeep(_props.labels[cycleSourceUuid])

  return _props
}

export const Sections = {
  cloneProps,
}
