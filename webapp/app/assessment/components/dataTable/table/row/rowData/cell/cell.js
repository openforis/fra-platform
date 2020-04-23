import React from 'react'
import PropTypes from 'prop-types'
import * as R from 'ramda'

import * as SectionSpec from '@webapp/app/assessment/components/section/sectionSpec'

import Calculated from './calculated'
import Number from './number'
import Text from './text'
import Select from './select'
import Placeholder from './placeholder'
import useClassName from './useClassName'

const ComponentsByType = {
  [SectionSpec.TYPES.calculated]: Calculated,
  [SectionSpec.TYPES.text]: Text,
  [SectionSpec.TYPES.textarea]: Text,
  [SectionSpec.TYPES.decimal]: Number,
  [SectionSpec.TYPES.integer]: Number,
  [SectionSpec.TYPES.select]: Select,
  [SectionSpec.TYPES.placeholder]: Placeholder,
}

const Cell = (props) => {
  const { data, assessmentType, sectionName, tableName, disabled, rowIdx, col, updateTableDataCell } = props

  const datum = R.pathOr(null, [rowIdx, col[SectionSpec.KEYS_COL.idx]])(data)

  const className = useClassName(col, rowIdx)

  const Component = ComponentsByType[col[SectionSpec.KEYS_COL.type]]
  return (
    <td className={className}>
      {Component &&
        React.createElement(Component, {
          datum,
          assessmentType,
          sectionName,
          tableName,
          disabled,
          col,
          rowIdx,
          updateTableDataCell,
        })}
    </td>
  )
}

Cell.propTypes = {
  data: PropTypes.array.isRequired,
  assessmentType: PropTypes.string.isRequired,
  sectionName: PropTypes.string.isRequired,
  tableName: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  rowIdx: PropTypes.number.isRequired,
  col: PropTypes.object.isRequired,
  updateTableDataCell: PropTypes.func.isRequired,
}

export default Cell
