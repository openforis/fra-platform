import { TFunction } from 'i18next'

import { Cycle } from 'meta/assessment/cycle'
import { Labels } from 'meta/assessment/labels'

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

const hasLinkedNodes = (props: { cycle: Cycle; col: Col }): boolean => {
  const { col, cycle } = props
  return Boolean(col.props?.linkedNodes?.[cycle.uuid])
}

const isReadOnly = (props: { cycle: Cycle; col: Col; row: Row }): boolean => {
  const { cycle, col, row } = props
  return !!(
    isCalculated(props) ||
    row.props.readonly ||
    [ColType.header, ColType.noticeMessage].includes(col.props.colType) ||
    hasLinkedNodes({ cycle, col })
  )
}

const getCalculateFn = (props: { cycle: Cycle; col: Col; row: Row }): string | undefined => {
  const { cycle, col, row } = props
  return col.props.calculateFn?.[cycle.uuid] ?? row.props.calculateFn?.[cycle.uuid]
}

const getClassNames = (props: { cycle: Cycle; col: Col }): Array<string> => {
  const { col, cycle } = props
  const { classNames = {} } = col.props
  return classNames[cycle.uuid] ?? []
}

const getLabel = (props: { cycle: Cycle; col: Col; t: TFunction }): string => {
  const { cycle, col, t } = props
  return col.props.colName ?? Labels.getCycleLabel({ cycle, labels: col.props.labels, t })
}

const getStyle = (props: { cycle: Cycle; col: Col }): ColStyle => {
  const { col, cycle } = props
  const { style = {} } = col.props
  return style[cycle.uuid] ?? {}
}

export const Cols = {
  getCalculateFn,
  getClassNames,
  getColName,
  getLabel,
  getStyle,
  hasLinkedNodes,
  isCalculated,
  isReadOnly,
}
