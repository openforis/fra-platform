import { Col } from 'meta/assessment/col'
import { Row } from 'meta/assessment/row'

type Props = {
  row: Row
  col: Col
}

export const useCellId = (props: Props): string => {
  const { col, row } = props
  let id = `col_id_${col.id}_row_id_${row.id}`

  if (row.props.variableName) id += `_variableName_${row.props.variableName}`
  if (col.props.colName) id += `_colName_${col.props.colName}`

  return id
}
