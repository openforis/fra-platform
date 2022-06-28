import React from 'react'
import { useTranslation } from 'react-i18next'

import { AssessmentName, Col, ColType, NodeValueValidations, Row, Table } from '@meta/assessment'
import { TableData, TableDatas } from '@meta/data'

import { useUser } from '@client/store/user'
import { useCountryIso } from '@client/hooks'
import Tooltip from '@client/components/Tooltip'

import Calculated from './Calculated'
import Number from './Number'
import Placeholder from './Placeholder'
import { PropsCell } from './props'
import Select from './Select'
import Text from './Text'
import useClassName from './useClassName'
import useOnChange from './useOnChange'

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

  const countryIso = useCountryIso()
  const user = useUser()
  const { t } = useTranslation()
  const tableName = table.props.name
  const { variableName } = row.props
  const { colName } = col.props
  const params = { data, countryIso, tableName, variableName, colName }
  const datum = TableDatas.getDatum(params)
  const nodeValue = TableDatas.getNodeValue(params)
  const valid = !user || NodeValueValidations.isValid(nodeValue)

  const className = useClassName({ col, row, valid })
  const { onChange, onPaste } = useOnChange({ table, col, row, nodeValue, data })
  const Component = Components[col.props.colType]

  if (!Component) return null

  const ComponentInstance = (
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
  )

  return (
    <td className={className}>
      {valid ? (
        ComponentInstance
      ) : (
        <Tooltip text={nodeValue.validation.messages.map(({ key, params }) => t(key, params)).join(`\n\r`)} error>
          {ComponentInstance}
        </Tooltip>
      )}
    </td>
  )
}

export default Cell
