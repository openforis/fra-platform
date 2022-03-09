import React from 'react'

import { AssessmentName, Col, ColType, Row, Table } from '@meta/assessment'
import { TableData, TableDatas } from '@meta/data'
import { useCountryIso } from '@client/hooks'
import Calculated from './Calculated'
import Number from './Number'
import Text from './Text'
import Select from './Select'
// import Placeholder from './Placeholder'
import useClassName from './useClassName'
import useOnChange from './useOnChange'
import { PropsCell } from './props'

const ComponentsByName: Record<string, React.FC<PropsCell>> = {
  [ColType.calculated]: Calculated,
  [ColType.text]: Text,
  [ColType.textarea]: Text,
  [ColType.decimal]: Number,
  [ColType.integer]: Number,
  [ColType.select]: Select,
  // [ColType.placeholder]: Placeholder,
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
  const datum = TableDatas.getDatum({ data, countryIso, table, row, col })
  const nodeValue = TableDatas.getNodeValue({ data, countryIso, table, row, col })

  const className = useClassName(col /* rowIndex */)

  const propsOnChange = { table, col, row, nodeValue }

  const { onChange, onPaste } = useOnChange(propsOnChange)

  const Component = ComponentsByName[col.props.colType]

  return (
    <td className={className}>
      {Component &&
        React.createElement(Component, {
          datum,
          assessmentName,
          sectionName,
          table,
          disabled,
          col,
          rowIndex,
          onChange,
          onPaste: disabled ? () => ({}) : onPaste,
        })}
    </td>
  )
}

export default Cell
