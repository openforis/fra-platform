import { Col, ColType } from './col'
import { Row, RowType } from './row'

/**
 * @deprecated - use table.columnNames
 */
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

const isCalculated = (props: { col: Col; row: Row }): boolean => {
  const { col, row } = props
  return (
    row.props?.readonly !== false &&
    Boolean(row.props.calculateFn || col.props.calculateFn || [ColType.calculated].includes(col.props.colType))
  )
}

const isReadOnly = (props: { col: Col; row: Row }): boolean => {
  const { col, row } = props
  return !!(
    isCalculated(props) ||
    row.props.readonly ||
    [ColType.header, ColType.noticeMessage].includes(col.props.colType)
  )
}

export const Cols = {
  /**
   * @deprecated - use table.columnNames
   */
  getColIndexes,
  getColName,
  isCalculated,
  isReadOnly,
}
