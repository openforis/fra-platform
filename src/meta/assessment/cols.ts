import { TFunction } from 'i18next'
import { Objects } from 'utils/objects'

import { Cycle } from 'meta/assessment/cycle'
import { Labels } from 'meta/assessment/labels'

import { Col, ColStyle, ColType } from './col'
import { Row } from './row'

const cloneProps = (props: { cycleSource: Cycle; cycleTarget: Cycle; col: Col }): Col['props'] => {
  const { cycleSource, cycleTarget, col } = props

  const { uuid: cycleSourceUuid } = cycleSource
  const { uuid: cycleTargetUuid } = cycleTarget

  const _props: Col['props'] = Objects.cloneDeep(col.props)
  _props.cycles.push(cycleTargetUuid)

  if (_props.calculateFn?.[cycleSourceUuid])
    _props.calculateFn[cycleTargetUuid] = Objects.cloneDeep(_props.calculateFn[cycleSourceUuid])
  if (_props.classNames?.[cycleSourceUuid])
    _props.classNames[cycleTargetUuid] = Objects.cloneDeep(_props.classNames[cycleSourceUuid])
  if (_props.labels?.[cycleSourceUuid])
    _props.labels[cycleTargetUuid] = Objects.cloneDeep(_props.labels[cycleSourceUuid])
  if (_props.linkedNodes?.[cycleSourceUuid])
    _props.linkedNodes[cycleTargetUuid] = Objects.cloneDeep(_props.linkedNodes[cycleSourceUuid])
  if (_props.style?.[cycleSourceUuid]) _props.style[cycleTargetUuid] = Objects.cloneDeep(_props.style[cycleSourceUuid])
  if (_props.validateFns?.[cycleSourceUuid])
    _props.validateFns[cycleTargetUuid] = Objects.cloneDeep(_props.validateFns[cycleSourceUuid])
  if (_props.variableNo?.[cycleSourceUuid])
    _props.variableNo[cycleTargetUuid] = Objects.cloneDeep(_props.variableNo[cycleSourceUuid])

  return _props
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
  cloneProps,
  getCalculateFn,
  getClassNames,
  getColName,
  getLabel,
  getStyle,
  hasLinkedNodes,
  isCalculated,
  isReadOnly,
}
