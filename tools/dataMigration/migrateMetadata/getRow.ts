import { Row, RowType } from '../../../meta/assessment/row'
import { Table } from '../../../meta/assessment/table'
import { RowSpec } from '../../../webapp/sectionSpec'

export const getRow = (props: { cycles: Array<string>; rowSpec: RowSpec; table: Table }): Row => {
  const { cycles, rowSpec, table } = props

  const row: Row = {
    props: {
      cycles,
      index: rowSpec.idx,
      linkToSection: '', // rowSpec. // TODO
      type: rowSpec.type as unknown as RowType,
      variableName: rowSpec.variableName, // ?? rowSpec.variableExport,
      calculateFn: rowSpec.migration?.calcFormula,
      readonly: rowSpec.migration?.readonly,
    },
    cols: [],
    tableId: table.id,
  }
  if (rowSpec.chartProps) {
    row.props.chart = rowSpec.chartProps
  }

  if (rowSpec.labelKey) {
    row.props.label = { ...row.props.label, key: rowSpec.labelKey }
  }
  if (rowSpec.labelPrefixKey) {
    row.props.label = { ...row.props.label, prefix: rowSpec.labelPrefixKey }
  }
  if (rowSpec.labelParams) {
    row.props.label = { ...row.props.label, params: rowSpec.labelParams }
  }
  if (rowSpec.migration?.format) {
    row.props.format = rowSpec.migration.format
  }
  return row
}
