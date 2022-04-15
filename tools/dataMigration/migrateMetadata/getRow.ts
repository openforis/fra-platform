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
    },
    cols: [],
    tableId: table.id,
  }
  if (rowSpec.chartProps) {
    row.props.chart = rowSpec.chartProps
  }

  if (rowSpec.labelKey) {
    row.props.labelKey = rowSpec.labelKey
  }
  if (rowSpec.labelPrefixKey) {
    row.props.labelPrefixKey = rowSpec.labelPrefixKey
  }
  if (rowSpec.labelParams) {
    row.props.labelParams = rowSpec.labelParams
  }
  if (rowSpec.variableExport) {
    row.props.variableExport = rowSpec.variableExport
  }

  return row
}
