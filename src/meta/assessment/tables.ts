import { Objects } from 'utils/objects'

import { Cycle } from 'meta/assessment/cycle'
import { Table } from 'meta/assessment/table'

const cloneProps = (props: { cycleSource: Cycle; cycleTarget: Cycle; table: Table }): Table['props'] => {
  const { cycleSource, cycleTarget, table } = props

  const { uuid: cycleSourceUuid } = cycleSource
  const { uuid: cycleTargetUuid } = cycleTarget

  const _props: Table['props'] = Objects.cloneDeep(table.props)
  _props.cycles.push(cycleTargetUuid)

  if (_props.cellsExportAlways?.[cycleSourceUuid])
    _props.cellsExportAlways[cycleTargetUuid] = Objects.cloneDeep(_props.cellsExportAlways[cycleSourceUuid])
  if (_props.columnNames?.[cycleSourceUuid])
    _props.columnNames[cycleTargetUuid] = Objects.cloneDeep(_props.columnNames[cycleSourceUuid])
  if (_props.columnsExport?.[cycleSourceUuid])
    _props.columnsExport[cycleTargetUuid] = Objects.cloneDeep(_props.columnsExport[cycleSourceUuid])
  if (_props.columnsExportAlways?.[cycleSourceUuid])
    _props.columnsExportAlways[cycleTargetUuid] = Objects.cloneDeep(_props.columnsExportAlways[cycleSourceUuid])
  if (_props.disableErrorMessage?.[cycleSourceUuid])
    _props.disableErrorMessage[cycleTargetUuid] = Objects.cloneDeep(_props.disableErrorMessage[cycleSourceUuid])

  return _props
}

export const Tables = {
  cloneProps,
}
