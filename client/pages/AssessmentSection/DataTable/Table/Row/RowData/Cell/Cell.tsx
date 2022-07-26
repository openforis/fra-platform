import './Cell.scss'
import React, { useCallback } from 'react'

import { AssessmentName, Col, ColType, NodeValueValidations, Row, Table } from '@meta/assessment'
import { NodeUpdate, TableData, TableDatas } from '@meta/data'
import { Authorizer } from '@meta/user'

import { useAppDispatch } from '@client/store'
import { useAssessmentSection, useCountry, useCycle } from '@client/store/assessment'
import { AssessmentSectionActions } from '@client/store/pages/assessmentSection'
import { useIsDataLocked } from '@client/store/ui/dataLock'
import { useUser } from '@client/store/user'
import { useCountryIso } from '@client/hooks'

import useClassName from './hooks/useClassName'
import { useListenNodeUpdate } from './hooks/useListenNodeUpdate'
import useOnChange from './hooks/useOnChange'
import Calculated from './Calculated'
import Number from './Number'
import Placeholder from './Placeholder'
import { PropsCell } from './props'
import Select from './Select'
import Text from './Text'

const Components: Record<string, React.FC<PropsCell>> = {
  [ColType.calculated]: Calculated,
  [ColType.text]: Text,
  [ColType.textarea]: Text,
  [ColType.decimal]: Number,
  [ColType.integer]: Number,
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
  const section = useAssessmentSection()
  const cycle = useCycle()
  const dataLocked = useIsDataLocked()

  const cycleName = cycle.name
  const tableName = table.props.name
  const { variableName } = row.props
  const { colName } = col.props
  const params = { data, countryIso, tableName, variableName, colName }
  const datum = TableDatas.getDatum(params)
  const nodeValue = TableDatas.getNodeValue(params)
  const valid = !Authorizer.canEdit({ countryIso, country, section, user }) || NodeValueValidations.isValid(nodeValue)

  const className = useClassName({ col, row, tableName, valid })
  const { onChange, onPaste } = useOnChange({ table, col, row, nodeValue, data })
  useListenNodeUpdate({ countryIso, assessmentName, cycleName, tableName, variableName, colName })

  const Component = Components[col.props.colType]

  const showError = useCallback(() => {
    if (!valid && dataLocked) {
      const nodeUpdate: NodeUpdate = { tableName, variableName, colName, value: nodeValue }
      dispatch(AssessmentSectionActions.setNodeValueValidation({ nodeUpdate }))
    }
  }, [colName, dataLocked, dispatch, nodeValue, tableName, valid, variableName])

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
        datum={datum}
        onChange={onChange}
        onPaste={onPaste}
      />
    </td>
  )
}

export default Cell
