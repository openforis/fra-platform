import { TFunction } from 'i18next'
import { Arrays } from 'utils/arrays'
import { Dates } from 'utils/dates'
import { Objects } from 'utils/objects'

import { Cycle } from 'meta/assessment/cycle'
import { Labels } from 'meta/assessment/labels'

import { Col, ColSelectOption, ColSelectProps, ColStyle, ColType } from './col'
import { Row } from './row'

const cloneProps = (props: { cycleSource: Cycle; cycleTarget: Cycle; col: Col }): Col['props'] => {
  const { cycleSource, cycleTarget, col } = props

  const { uuid: cycleSourceUuid } = cycleSource
  const { uuid: cycleTargetUuid } = cycleTarget

  const _props: Col['props'] = Objects.cloneDeep(col.props)
  _props.cycles.push(cycleTargetUuid)

  if (!Objects.isNil(_props.calculateFn?.[cycleSourceUuid]))
    _props.calculateFn[cycleTargetUuid] = Objects.cloneDeep(_props.calculateFn[cycleSourceUuid])
  if (!Objects.isNil(_props.classNames?.[cycleSourceUuid]))
    _props.classNames[cycleTargetUuid] = Objects.cloneDeep(_props.classNames[cycleSourceUuid])
  if (!Objects.isNil(_props.labels?.[cycleSourceUuid]))
    _props.labels[cycleTargetUuid] = Objects.cloneDeep(_props.labels[cycleSourceUuid])
  if (!Objects.isNil(_props.linkedNodes?.[cycleSourceUuid]))
    _props.linkedNodes[cycleTargetUuid] = Objects.cloneDeep(_props.linkedNodes[cycleSourceUuid])
  if (!Objects.isNil(_props.select?.[cycleSourceUuid]))
    _props.select[cycleTargetUuid] = Objects.cloneDeep(_props.select[cycleSourceUuid])
  if (!Objects.isNil(_props.style?.[cycleSourceUuid]))
    _props.style[cycleTargetUuid] = Objects.cloneDeep(_props.style[cycleSourceUuid])
  if (!Objects.isNil(_props.validateFns?.[cycleSourceUuid]))
    _props.validateFns[cycleTargetUuid] = Objects.cloneDeep(_props.validateFns[cycleSourceUuid])
  if (!Objects.isNil(_props.variableNo?.[cycleSourceUuid]))
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

const getStyle = (props: { cycle: Cycle; col: Col }): ColStyle & { gridColumn?: string; gridRow?: string } => {
  const { col, cycle } = props
  const { style = {} } = col.props
  const colStyle = style[cycle.uuid] ?? {}
  const { colSpan, rowSpan } = colStyle

  return {
    ...colStyle,
    gridColumn: Objects.isNil(colSpan) ? undefined : `span ${colSpan}`,
    gridRow: Objects.isNil(rowSpan) ? undefined : `span ${rowSpan}`,
  }
}

const getSelectProps = (props: { cycle: Cycle; col: Col }): ColSelectProps => {
  const { col, cycle } = props

  return col.props.select?.[cycle.uuid] ?? { options: [] }
}

const getSelectOptions = (props: { cycle: Cycle; col: Col }): Array<ColSelectOption> => {
  const selectProps = getSelectProps(props)
  const { options, years } = selectProps
  if (!Objects.isNil(options)) {
    return options
  }

  if (!Objects.isNil(years)) {
    const { start, end = Dates.getCurrentYear() + 1 } = years

    return Arrays.reverse(Arrays.range(start, end)).map<ColSelectOption>((year) => ({ name: String(year) }))
  }

  throw new Error(`Unable to get col options. col: ${JSON.stringify(props.col)}`)
}

export const Cols = {
  cloneProps,
  getCalculateFn,
  getClassNames,
  getColName,
  getLabel,
  getSelectOptions,
  getSelectProps,
  getStyle,
  hasLinkedNodes,
  isCalculated,
  isReadOnly,
}
