import { Objects } from 'utils/objects'

import { Cycle } from 'meta/assessment/cycle'
import { Row } from 'meta/assessment/row'
import { Table } from 'meta/assessment/table'

const cloneProps = (props: { cycleSource: Cycle; cycleTarget: Cycle; table: Table }): Table['props'] => {
  const { cycleSource, cycleTarget, table } = props

  const { uuid: cycleSourceUuid } = cycleSource
  const { uuid: cycleTargetUuid } = cycleTarget

  const _props: Table['props'] = Objects.cloneDeep(table.props)
  _props.cycles.push(cycleTargetUuid)

  if (!Objects.isNil(_props.cellsExportAlways?.[cycleSourceUuid]))
    _props.cellsExportAlways[cycleTargetUuid] = Objects.cloneDeep(_props.cellsExportAlways[cycleSourceUuid])
  if (!Objects.isNil(_props.columnNames?.[cycleSourceUuid]))
    _props.columnNames[cycleTargetUuid] = Objects.cloneDeep(_props.columnNames[cycleSourceUuid])
  if (!Objects.isNil(_props.columnsExport?.[cycleSourceUuid]))
    _props.columnsExport[cycleTargetUuid] = Objects.cloneDeep(_props.columnsExport[cycleSourceUuid])
  if (!Objects.isNil(_props.columnsExportAlways?.[cycleSourceUuid]))
    _props.columnsExportAlways[cycleTargetUuid] = Objects.cloneDeep(_props.columnsExportAlways[cycleSourceUuid])
  if (!Objects.isNil(_props.disableErrorMessage?.[cycleSourceUuid]))
    _props.disableErrorMessage[cycleTargetUuid] = Objects.cloneDeep(_props.disableErrorMessage[cycleSourceUuid])
  if (!Objects.isNil(_props.style?.[cycleSourceUuid]))
    _props.style[cycleTargetUuid] = Objects.cloneDeep(_props.style[cycleSourceUuid])

  return _props
}

const getChartRows = (props: { table: Table; cycle: Cycle }): Array<Row> => {
  const { cycle, table } = props
  return table.rows.filter((row) => !Objects.isEmpty(row.props.chart?.[cycle.uuid]))
}

export const Tables = {
  cloneProps,
  getChartRows,
}
