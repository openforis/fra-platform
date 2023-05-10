import './Cell.scss'
import React, { useCallback } from 'react'

import { AssessmentName, Col, ColType, NodeValueValidations, Row, Table } from '@meta/assessment'
import { NodeUpdate, TableData, TableDatas } from '@meta/data'
import { Authorizer } from '@meta/user'

import { useAppDispatch } from '@client/store'
import { useAssessmentSection, useCountry, useCycle } from '@client/store/assessment'
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
  data: TableData
  assessmentName: AssessmentName
  sectionName: string
  table: Table
  disabled: boolean
  rowIndex: number
  col: Col
  row: Row
}

const Cell: React.FC<Props> = (props) => {
  const { data, assessmentName, sectionName, table, disabled, rowIndex, col, row } = props

  const dispatch = useAppDispatch()
  const countryIso = useCountryIso()
  const country = useCountry(countryIso)
  const user = useUser()
  const section = useAssessmentSection(sectionName)
  const cycle = useCycle()

  const tableName = table.props.name
  const { variableName } = row.props
  const { colName } = col.props
  const params = { data, countryIso, tableName, variableName, colName }
  const nodeValue = TableDatas.getNodeValue(params)
  const valid = !Authorizer.canEditData({ country, cycle, section, user }) || NodeValueValidations.isValid(nodeValue)

  const className = useClassName({ col, row, tableName, valid })
  const { onChange, onChangeNodeValue, onPaste } = useOnChange({ table, col, row, nodeValue, data, sectionName })

  const Component = Components[col.props.colType]

  const showError = useCallback(() => {
    if (!valid) {
      const nodeUpdate: NodeUpdate & { assessmentName: string; cycleName: string } = {
        tableName,
        variableName,
        colName,
        value: nodeValue,
        cycleName: cycle.name,
        assessmentName,
      }
      dispatch(AssessmentSectionActions.setNodeValidationToDisplay({ nodeUpdate }))
    }
  }, [assessmentName, colName, cycle.name, dispatch, nodeValue, tableName, valid, variableName])

  if (!Component) return null

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <td className={className} onClick={showError} onKeyDown={showError}>
      <Component
        assessmentName={assessmentName}
        sectionName={sectionName}
        table={table}
        disabled={disabled || nodeValue?.odp}
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
