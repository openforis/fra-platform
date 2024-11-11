import './Cell.scss'
import React from 'react'

import { AssessmentName, Col, Cols, ColType, Row, Table } from 'meta/assessment'
import { RecordAssessmentData } from 'meta/data'
import { TooltipId } from 'meta/tooltip'

import { useCycle } from 'client/store/assessment'
import { useNodeValueValidation } from 'client/store/data'
import { DataCell } from 'client/components/DataGrid'

import useClassName from './hooks/useClassName'
import useErrorMessages from './hooks/useErrorMessages'
import { useNodeValue } from './hooks/useNodeValue'
import useOnChange from './hooks/useOnChange'
import Calculated from './Calculated'
import Flags from './Flags'
import Multiselect from './Multiselect'
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
  [ColType.multiselect]: Multiselect,
  [ColType.select]: Select,
  [ColType.placeholder]: Placeholder,
}

type Props = {
  assessmentName: AssessmentName
  col: Col
  data: RecordAssessmentData
  disabled: boolean
  lastCol: boolean
  lastRow: boolean
  row: Row
  rowIndex: number
  sectionName: string
  table: Table
}

const emptyFn = () => ({})

const Cell: React.FC<Props> = (props) => {
  const {
    data,
    assessmentName,
    lastCol,
    lastRow,
    sectionName,
    table,
    disabled: disabledProps,
    rowIndex,
    col,
    row,
  } = props

  const cycle = useCycle()
  const nodeValue = useNodeValue({ col, data, row, table })
  const { onChange, onChangeNodeValue, onPaste } = useOnChange({ table, col, row, nodeValue, data, sectionName })
  const validation = useNodeValueValidation({ table, row, col })
  const errorMessages = useErrorMessages({ validation })
  const className = useClassName({ cycle, col, row, validation })

  const disabled = disabledProps || !!nodeValue?.odpId || Cols.hasLinkedNodes({ cycle, col })
  const Component = Components[col.props.colType]
  const { gridColumn, gridRow, ...style } = Cols.getStyle({ col, cycle })

  if (!Component) return null

  return (
    <DataCell
      className={className}
      data-tooltip-html={errorMessages}
      data-tooltip-id={TooltipId.error}
      gridColumn={gridColumn}
      gridRow={gridRow}
      // id={`${col.props.colType}_${col.id}_${col.props.colName ?? ''}`}
      lastCol={lastCol}
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

      <Flags col={col} nodeValue={nodeValue} row={row} sectionName={sectionName} />
    </DataCell>
  )
}

export default Cell
