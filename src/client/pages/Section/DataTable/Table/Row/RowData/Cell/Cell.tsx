import './Cell.scss'
import React from 'react'

import { AssessmentName, Col, Cols, ColType, Row, Table } from 'meta/assessment'
import { RecordAssessmentData } from 'meta/data'
import { TooltipId } from 'meta/tooltip'

import { useCycle } from 'client/store/assessment'
import { useNodeValueValidation } from 'client/store/data'

import Calculated from '../../../GridRow/RowData/Cell/Calculated'
import Flags from '../../../GridRow/RowData/Cell/Flags'
import useErrorMessages from '../../../GridRow/RowData/Cell/hooks/useErrorMessages'
import { useNodeValue } from '../../../GridRow/RowData/Cell/hooks/useNodeValue'
import useOnChange from '../../../GridRow/RowData/Cell/hooks/useOnChange'
import Number from '../../../GridRow/RowData/Cell/Number'
import Placeholder from '../../../GridRow/RowData/Cell/Placeholder'
import Select from '../../../GridRow/RowData/Cell/Select'
import Taxon from '../../../GridRow/RowData/Cell/Taxon'
import Text from '../../../GridRow/RowData/Cell/Text'
import useClassName from './hooks/useClassName'
import { PropsCell } from './props'

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
  data: RecordAssessmentData
  assessmentName: AssessmentName
  sectionName: string
  table: Table
  disabled: boolean
  rowIndex: number
  col: Col
  row: Row
}

const emptyFn = () => ({})

const Cell: React.FC<Props> = (props) => {
  const { data, assessmentName, sectionName, table, disabled: disabledProps, rowIndex, col, row } = props

  const cycle = useCycle()
  const nodeValue = useNodeValue({ col, data, row, table })
  const { onChange, onChangeNodeValue, onPaste } = useOnChange({ table, col, row, nodeValue, data, sectionName })
  const validation = useNodeValueValidation({ table, row, col })
  const errorMessages = useErrorMessages({ validation })
  const className = useClassName({ cycle, col, row, validation })

  const disabled = disabledProps || !!nodeValue?.odpId || Cols.hasLinkedNodes({ cycle, col })
  const Component = Components[col.props.colType]
  const { colSpan, rowSpan, ...style } = Cols.getStyle({ col, cycle })

  if (!Component) return null

  return (
    <td
      className={className}
      colSpan={colSpan}
      data-tooltip-html={errorMessages}
      data-tooltip-id={TooltipId.error}
      id={`${col.props.colType}_${col.id}_${col.props.colName ?? ''}`}
      rowSpan={rowSpan}
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
    </td>
  )
}

export default Cell
