import React from 'react'
import * as R from 'ramda'

import * as SectionSpec from '@webapp/app/assessment/components/section/sectionSpec'

import Calculated from './calculated'
import Number from './number'
import Text from './text'
import Select from './select'
import Placeholder from './placeholder'
import useClassName from './useClassName'
import useOnChange from './useOnChange'

const ComponentsByType = {
  [SectionSpec.TypeSpec.calculated]: Calculated,
  [SectionSpec.TypeSpec.text]: Text,
  [SectionSpec.TypeSpec.textarea]: Text,
  [SectionSpec.TypeSpec.decimal]: Number,
  [SectionSpec.TypeSpec.integer]: Number,
  [SectionSpec.TypeSpec.select]: Select,
  [SectionSpec.TypeSpec.placeholder]: Placeholder,
}

type Props = {
  data: any[]
  assessmentType: string
  sectionName: string
  tableSpec: any
  disabled: boolean
  rowIdx: number
  col: any
}

const Cell = (props: Props) => {
  const { data, assessmentType, sectionName, tableSpec, disabled, rowIdx, col } = props

  const datum = R.pathOr(null, [rowIdx, col[SectionSpec.KEYS_COL.idx]])(data)

  const className = useClassName(col, rowIdx)

  const propsOnChange = { assessmentType, sectionName, tableSpec, rowIdx, col, datum }
  const { onChange, onPaste } = useOnChange(propsOnChange)

  const Component: any = ComponentsByType[col[SectionSpec.KEYS_COL.type]]
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
