import { RowSpec } from '../../webapp/sectionSpec'
import { Row, RowType, Table } from '../../meta/assessment'

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
