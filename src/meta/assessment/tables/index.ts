import { Objects } from 'utils/objects'

import { Country } from 'meta/area/country'
import { Cycle } from 'meta/assessment/cycle'
import { Row } from 'meta/assessment/row'
import { Table, TableVisibility } from 'meta/assessment/table'
import { User, Users } from 'meta/user'

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

const isVisible = (props: { country: Country; cycle: Cycle; print: boolean; table: Table; user: User }): boolean => {
  const { country, cycle, print, table, user } = props
  const { countryIso } = country
  const visibility = table.props.visibility?.[cycle.uuid]

  if (!visibility) return true
  if (print) return visibility.includes(TableVisibility.print)
  if (user) return visibility.includes(TableVisibility.private) && Users.hasRoleInCountry({ user, cycle, countryIso })
  return visibility.includes(TableVisibility.public)
}

export const Tables = {
  cloneProps,
  getChartRows,
  isVisible,
}
