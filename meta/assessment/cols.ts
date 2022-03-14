import { Row, RowType } from './row'
import { Col } from './col'

const getColIndexes = (props: { rows: Array<Row>; cols: Array<Col> }): Array<number> => {
  const { rows, cols } = props
  const maxCols = rows
    .filter((row) => [RowType.data, RowType.calculated].includes(row.props.type))
    .reduce<number>((max, row) => {
      const colsRow = cols.filter((col) => col.rowId === row.id && col.props.index >= 0)
      return colsRow.reduce<number>((m, col) => (Number(col.props.index) > m ? Number(col.props.index) : m), max)
    }, 0)
  return Array.from(Array(maxCols + 1).keys())
}

const getColName = (props: { colIdx: number; cols: Array<Col> }): string => {
  const { colIdx, cols } = props
  const col = cols.find((c) => c.props.index === colIdx)
  if (!col) {
    throw new Error(`Column not found. Col idx ${colIdx}`)
  }
  // return `_${col?.props?.colName ?? ''}_${colIdx}`
  return col.props.colName ?? '' // `"${col.props.colName ?? ''}"`
}

export const Cols = {
  getColIndexes,
  getColName,
}
