import './Cell.scss'
import React from 'react'

import { AssessmentName, Col, Cols, ColType, Row, Table } from 'meta/assessment'
import { RecordAssessmentData } from 'meta/data'
import { TooltipId } from 'meta/tooltip'
import { Authorizer } from 'meta/user'

import { useAssessmentSection, useCountry, useCycle } from 'client/store/assessment'
import { useUser } from 'client/store/user'
import { useCountryIso } from 'client/hooks'

import useClassName from './hooks/useClassName'
import useErrorMessages from './hooks/useErrorMessages'
import { useNodeValue } from './hooks/useNodeValue'
import useOnChange from './hooks/useOnChange'
import { useValidateNode } from './hooks/useValidateNode'
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
  data: RecordAssessmentData
  assessmentName: AssessmentName
  sectionName: string
  table: Table
  disabled: boolean
  rowIndex: number
  col: Col
  row: Row
}

const Cell: React.FC<Props> = (props) => {
  const { data, assessmentName, sectionName, table, disabled: disabledProps, rowIndex, col, row } = props

  const countryIso = useCountryIso()
  const country = useCountry(countryIso)
  const user = useUser()
  const section = useAssessmentSection(sectionName)
  const cycle = useCycle()

  const canEditData = Authorizer.canEditData({ country, cycle, section, user })

  const nodeValue = useNodeValue({ col, data, row, table })
  const validation = useValidateNode({ canEditData, col, row })

  const { valid } = validation

  const className = useClassName({ cycle, col, row, valid })
  const { onChange, onChangeNodeValue, onPaste } = useOnChange({ table, col, row, nodeValue, data, sectionName })
  const errorMessages = useErrorMessages({ validation })

  const disabled = disabledProps || !!nodeValue?.odpId || Cols.hasLinkedNodes({ cycle, col })
  const Component = Components[col.props.colType]
  const { colSpan, rowSpan, ...style } = Cols.getStyle({ col, cycle })

  if (!Component) return null

  return (
    <td
      colSpan={colSpan}
      className={className}
      rowSpan={rowSpan}
      style={style}
      data-tooltip-id={TooltipId.error}
      data-tooltip-html={errorMessages}
    >
      <Component
        assessmentName={assessmentName}
        sectionName={sectionName}
        table={table}
        disabled={disabled}
        rowIndex={rowIndex}
        col={col}
        row={row}
        nodeValue={nodeValue}
        onChange={onChange}
        onChangeNodeValue={onChangeNodeValue}
        onPaste={onPaste}
      />

      <Flags col={col} nodeValue={nodeValue} row={row} sectionName={sectionName} />
    </td>
  )
}

export default Cell
