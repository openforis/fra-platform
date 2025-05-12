import './Cell.scss'
import React from 'react'

import { AssessmentName } from 'meta/assessment/assessment'
import { Col, ColType } from 'meta/assessment/col'
import { Cols } from 'meta/assessment/cols'
import { Row } from 'meta/assessment/row'
import { RowCache } from 'meta/assessment/rowCache'
import { Table } from 'meta/assessment/table'
import { RecordAssessmentData } from 'meta/data'
import { TooltipId } from 'meta/tooltip'

import { useCycle } from 'client/store/assessment'
import {
  useHistoryLastApprovedDataTableFetched,
  useHistoryLastApprovedIsActive,
  useNodeValueValidation,
} from 'client/store/data'
import { DataCell } from 'client/components/DataGrid'

import { useClassName } from './hooks/useClassName'
import { useEnableIf } from './hooks/useEnableIf'
import useErrorMessages from './hooks/useErrorMessages'
import { useNodeValue } from './hooks/useNodeValue'
import useOnChange from './hooks/useOnChange'
import Calculated from './Calculated'
import Flags from './Flags'
import History from './History'
import Number from './Number'
import Placeholder from './Placeholder'
import { PropsCell } from './props'
import Select from './Select'
import Taxon from './Taxon'
import Text from './Text'

const Components: Record<string, React.FC<PropsCell>> = {
  [ColType.calculated]: Calculated,
  [ColType.taxon]: Taxon,
  [ColType.text]: Text,
  [ColType.textarea]: Text,
  [ColType.decimal]: Number,
  [ColType.integer]: Number,
  [ColType.select]: Select,
  [ColType.placeholder]: Placeholder,
}

type Props = {
  assessmentName: AssessmentName
  col: Col
  data: RecordAssessmentData
  disabled: boolean
  firstCol?: boolean
  firstHighlightCol?: boolean
  highlighted?: boolean
  lastCol: boolean
  lastHighlightCol?: boolean
  lastRow: boolean
  row: Row
  rowIndex: number
  sectionName: string
  table: Table
}

const emptyFn = () => ({})

const Cell: React.FC<Props> = (props) => {
  const {
    assessmentName,
    col,
    data,
    disabled: _disabled,
    firstCol,
    firstHighlightCol,
    highlighted,
    lastCol,
    lastHighlightCol,
    lastRow,
    row,
    rowIndex,
    sectionName,
    table,
  } = props

  const cycle = useCycle()

  const rowCache: RowCache = {
    ...row,
    tableName: table.props.name,
    sectionName,
  }

  const enabled = useEnableIf({ data, col, row: rowCache })

  const nodeValue = useNodeValue({ col, data, row, table })
  const { onChange, onChangeNodeValue, onPaste } = useOnChange({ col, data, nodeValue, row, sectionName, table })
  const validation = useNodeValueValidation({ col, row, table })
  const errorMessages = useErrorMessages({ validation })
  const className = useClassName({ col, cycle, row, validation })

  const disabled = _disabled || !!nodeValue?.odpId || Cols.hasLinkedNodes({ col, cycle }) || !enabled

  const historyLastApprovedIsActive = useHistoryLastApprovedIsActive()
  const historyLastApprovedDataTableFetched = useHistoryLastApprovedDataTableFetched(table.props.name)
  const displayHistory = historyLastApprovedIsActive && historyLastApprovedDataTableFetched && !Cols.isPlaceholder(col)

  const Component = displayHistory ? History : Components[col.props.colType]
  const { gridColumn, gridRow, ...style } = Cols.getStyle({ col, cycle })
  const isInput = ![ColType.calculated, ColType.placeholder].includes(col.props.colType)

  if (!Component) return null

  return (
    <DataCell
      className={className}
      data-tooltip-html={errorMessages}
      data-tooltip-id={TooltipId.error}
      editable={!disabled && isInput}
      firstCol={firstCol}
      firstHighlightCol={firstHighlightCol}
      gridColumn={gridColumn}
      gridRow={gridRow}
      highlighted={highlighted}
      lastCol={lastCol}
      lastHighlightCol={lastHighlightCol}
      lastRow={lastRow}
      style={style}
    >
      <Component
        assessmentName={assessmentName}
        col={col}
        disabled={disabled}
        nodeValue={nodeValue}
        onChange={disabled ? emptyFn : onChange}
        onChangeNodeValue={disabled ? emptyFn : onChangeNodeValue}
        onPaste={disabled ? emptyFn : onPaste}
        row={row}
        rowIndex={rowIndex}
        sectionName={sectionName}
        table={table}
      />

      {!displayHistory && <Flags col={col} nodeValue={nodeValue} row={row} sectionName={sectionName} />}
    </DataCell>
  )
}

export default Cell
