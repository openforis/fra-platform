import { Cycle } from 'meta/assessment/cycle'
import { TableSection } from 'meta/assessment/tableSection'

const cloneProps = (props: {
  cycleSource: Cycle
  cycleTarget: Cycle
  tableSection: TableSection
}): TableSection['props'] => {
  const { cycleSource, cycleTarget, tableSection } = props

  const { uuid: cycleSourceUuid } = cycleSource
  const { uuid: cycleTargetUuid } = cycleTarget

  const _props: TableSection['props'] = { ...tableSection.props }
  _props.cycles.push(cycleTargetUuid)

  if (_props.descriptions?.[cycleSourceUuid])
    _props.descriptions[cycleTargetUuid] = _props.descriptions[cycleSourceUuid]
  if (_props.labels?.[cycleSourceUuid]) _props.labels[cycleTargetUuid] = _props.labels[cycleSourceUuid]

  return _props
}

export const TableSections = {
  cloneProps,
}
