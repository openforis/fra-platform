import { TFunction } from 'i18next'

import { Cycle } from '@meta/assessment/cycle'

import { Col, ColStyle, ColType } from './col'
import { Row } from './row'

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

const getStyle = (props: { cycle: Cycle; col: Col }): ColStyle => {
  const { col, cycle } = props
  const { style = {} } = col.props
  return style[cycle.uuid] ?? { colSpan: undefined, rowSpan: undefined }
}

const getLabel = (props: { cycle: Cycle; col: Col; t: TFunction }): string => {
  const { cycle, col, t } = props
  const { labels } = col.props
  const label = labels?.[cycle.uuid]

  let labelString = col.props.colName ?? ''
  if (label) {
    if (label.prefixKey) labelString += t(label.prefixKey)
    if (label.key) labelString += t(label.key, { ...label.params })
    if (label.label) labelString += label.label
  }
  return labelString
}

export const Cols = {
  getColName,
  isCalculated,
  isReadOnly,
  getLabel,
  getStyle,
}
