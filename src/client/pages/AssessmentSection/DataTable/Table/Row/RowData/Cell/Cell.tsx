import './Cell.scss'
import React from 'react'

import classNames from 'classnames'

import { AssessmentName, Col, Cols, ColType, NodeValueValidations, Row, Table } from '@meta/assessment'
import { RecordAssessmentData, RecordAssessmentDatas } from '@meta/data'
import { TooltipId } from '@meta/tooltip'
import { Authorizer } from '@meta/user'

import { useAssessment, useAssessmentSection, useCountry, useCycle } from '@client/store/assessment'
import { useUser } from '@client/store/user'
import { useCountryIso } from '@client/hooks'

import useClassName from './hooks/useClassName'
import useErrorMessages from './hooks/useErrorMessages'
import useOnChange from './hooks/useOnChange'
import Calculated from './Calculated'
import EstimationMark from './EstimationMark'
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
  const assessment = useAssessment()

  const tableName = table.props.name
  const { variableName } = row.props
  const { colName } = col.props
  const params = {
    assessmentName: assessment.props.name,
    cycleName: cycle.name,
    data,
    countryIso,
    tableName,
    variableName,
    colName,
  }
  const nodeValue = RecordAssessmentDatas.getNodeValue(params)

  const valid = !Authorizer.canEditData({ country, cycle, section, user }) || NodeValueValidations.isValid(nodeValue)
  const disabled = disabledProps || nodeValue?.odp || Cols.hasLinkedNodes({ cycle, col })

  const className = useClassName({ cycle, col, row })
  const { onChange, onChangeNodeValue, onPaste } = useOnChange({ table, col, row, nodeValue, data, sectionName })

  const Component = Components[col.props.colType]
  const { colSpan, rowSpan, ...style } = Cols.getStyle({ col, cycle })

  const errorMessages = useErrorMessages({ nodeValue })

  if (!Component) return null

  const component = (
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
  )

  return (
    <td
      colSpan={colSpan}
      className={classNames(className, { 'validation-error': !valid })}
      rowSpan={rowSpan}
      style={style}
      data-tooltip-id={TooltipId.error}
      data-tooltip-html={!valid ? errorMessages : null}
    >
      {component}

      {nodeValue?.estimationUuid && <EstimationMark estimationUuid={nodeValue.estimationUuid} />}
    </td>
  )
}

export default Cell
