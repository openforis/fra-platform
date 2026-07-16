import './Cell.scss'
import React from 'react'

import { AssessmentName } from 'meta/assessment/assessment'
import { Col, ColType } from 'meta/assessment/col'
import { Cols } from 'meta/assessment/cols'
import { Row } from 'meta/assessment/row'
import { Table } from 'meta/assessment/table'
import { RecordAssessmentData } from 'meta/data/recordData'

import { useHistoryLastApprovedIsActive } from 'client/store/data/history/hooks/lastApproved'
import { useHistoryLastApprovedDataTableFetched } from 'client/store/data/history/hooks/lastApprovedTableData'
import { useNodeValueValidation } from 'client/store/data/validations/hooks/tables'
import { useCycle } from 'client/store/meta/hooks/cycles'
import { DataCell } from 'client/components/DataGrid'
import { useCellId } from 'client/pages/Section/DataTable/Table/hooks/useCellId'

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

const emptyFn = (): object => ({})

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

  const enabled = useEnableIf({ data, col, row, sectionName, table })

  const nodeValue = useNodeValue({ col, data, row, table })
  const { onChange, onChangeNodeValue, onPaste } = useOnChange({ col, data, nodeValue, row, sectionName, table })
  const validation = useNodeValueValidation({ col, row, table })
  const tooltip = useErrorMessages({ validation })
  const className = useClassName({ col, cycle, enabled, row, validation })

  const disabled = _disabled || !!nodeValue?.odpId || Cols.hasLinkedNodes({ col, cycle }) || !enabled

  const historyLastApprovedIsActive = useHistoryLastApprovedIsActive()
  const historyLastApprovedDataTableFetched = useHistoryLastApprovedDataTableFetched(table.props.name)
  const displayHistory = historyLastApprovedIsActive && historyLastApprovedDataTableFetched && !Cols.isPlaceholder(col)

  const Component = displayHistory ? History : Components[col.props.colType]
  const { gridColumn, gridRow, ...style } = Cols.getStyle({ col, cycle })
  const isInput = ![ColType.calculated, ColType.placeholder].includes(col.props.colType)

  const id = useCellId({ col, row })

  if (!Component) return null

  return (
    <DataCell
      className={className}
      editable={!disabled && isInput}
      firstCol={firstCol}
      firstHighlightCol={firstHighlightCol}
      gridColumn={gridColumn}
      gridRow={gridRow}
      highlighted={highlighted}
      id={id}
      lastCol={lastCol}
      lastHighlightCol={lastHighlightCol}
      lastRow={lastRow}
      style={style}
      tooltip={tooltip}
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

      {!displayHistory && <Flags col={col} nodeValue={nodeValue} row={row} sectionName={sectionName} table={table} />}
    </DataCell>
  )
}

export default Cell
