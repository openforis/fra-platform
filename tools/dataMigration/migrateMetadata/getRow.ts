import { RowSpec } from '../../../webapp/sectionSpec'
import { Table } from '../../../meta/assessment/table'
import { Row, RowType } from '../../../meta/assessment/row'

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
  return row
}
