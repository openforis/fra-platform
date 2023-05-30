import './Cell.scss'
import React, { useCallback } from 'react'

import { AssessmentName, Col, Cols, ColType, NodeValueValidations, Row, Table } from '@meta/assessment'
import { NodeUpdate, RecordAssessmentData, RecordAssessmentDatas } from '@meta/data'
import { Authorizer } from '@meta/user'

import { useAppDispatch } from '@client/store'
import { useAssessment, useAssessmentSection, useCountry, useCycle } from '@client/store/assessment'
import { AssessmentSectionActions } from '@client/store/ui/assessmentSection'
import { useUser } from '@client/store/user'
import { useCountryIso } from '@client/hooks'

import useClassName from './hooks/useClassName'
import useOnChange from './hooks/useOnChange'
import Calculated from './Calculated'
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

  const dispatch = useAppDispatch()
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

  const className = useClassName({ cycle, col, row, tableName, valid })
  const { onChange, onChangeNodeValue, onPaste } = useOnChange({ table, col, row, nodeValue, data, sectionName })

  const Component = Components[col.props.colType]
  const { colSpan, rowSpan, ...style } = Cols.getStyle({ col, cycle })

  /**
   * @deprecated. TODO: on hover, show tooltip
   */
  const showError = useCallback(() => {
    if (!valid) {
      const nodeUpdate: NodeUpdate = { tableName, variableName, colName, value: nodeValue }
      dispatch(
        AssessmentSectionActions.setNodeValidationToDisplay({
          nodeUpdate,
          assessmentName,
          cycleName: cycle.name,
        })
      )
    }
  }, [assessmentName, colName, cycle.name, dispatch, nodeValue, tableName, valid, variableName])

  if (!Component) return null

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <td
      colSpan={colSpan}
      className={className}
      onClick={showError}
      onKeyDown={showError}
      rowSpan={rowSpan}
      style={style}
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
    </td>
  )
}

export default Cell
