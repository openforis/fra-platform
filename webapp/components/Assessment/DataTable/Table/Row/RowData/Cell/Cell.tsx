import React from 'react'

import { AssessmentType, TableData, TableDataRow } from '@core/assessment'
import { ColSpec, TableSpec, TypeSpec } from '@webapp/sectionSpec'

import Calculated from './Calculated'
import Number from './Number'
import Text from './Text'
import Select from './Select'
import Placeholder from './Placeholder'
import useClassName from './useClassName'
import useOnChange from './useOnChange'
import { PropsCell } from './props'

const ComponentsByType: Record<string, React.FC<PropsCell>> = {
  [TypeSpec.calculated]: Calculated,
  [TypeSpec.text]: Text,
  [TypeSpec.textarea]: Text,
  [TypeSpec.decimal]: Number,
  [TypeSpec.integer]: Number,
  [TypeSpec.select]: Select,
  [TypeSpec.placeholder]: Placeholder,
}

type Props = {
  data: TableData
  assessmentType: AssessmentType
  sectionName: string
  tableSpec: TableSpec
  disabled: boolean
  rowIdx: number
  col: ColSpec
}

const Cell: React.FC<Props> = (props) => {
  const { data, assessmentType, sectionName, tableSpec, disabled, rowIdx, col } = props

  const datum = (data?.[rowIdx] as TableDataRow)?.[col.idx as number]

  const className = useClassName(col, rowIdx)

  const propsOnChange = { assessmentType, sectionName, tableSpec, rowIdx, col, datum }
  const { onChange, onPaste } = useOnChange(propsOnChange)

  const Component = ComponentsByType[col.type]

  return (
    <td className={className}>
      {Component &&
        React.createElement(Component, {
          datum,
          assessmentType,
          sectionName,
          tableSpec,
          disabled,
          col,
          rowIdx,
          onChange,
          onPaste: disabled ? () => ({}) : onPaste,
        })}
    </td>
  )
}

export default Cell
