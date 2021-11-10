import { RowSpec } from '../../webapp/sectionSpec'
import { Table } from '../../core/meta/table'
import { Row, RowType } from '../../core/meta/row'

export const getRow = (props: { cycles: Array<string>; rowSpec: RowSpec; table: Table }): Row => {
  const { cycles, rowSpec, table } = props

  const row: Row = {
    props: {
      cycles,
      index: Number(rowSpec.idx),
      linkToSection: '', // rowSpec. // TODO
      type: rowSpec.type as unknown as RowType,
    },
    cols: [],
    tableId: table.id,
  }
  return row
}
