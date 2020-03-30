import React from 'react'
import PropTypes from 'prop-types'
import * as R from 'ramda'

import * as SectionSpec from '@webapp/app/assessment/components/section/sectionSpec'

import Calculated from '@webapp/app/assessment/components/dataTable/table/cell/calculated'
import Number from '@webapp/app/assessment/components/dataTable/table/cell/number'
import Text from '@webapp/app/assessment/components/dataTable/table/cell/text'
import Select from '@webapp/app/assessment/components/dataTable/table/cell/select'
import Placeholder from '@webapp/app/assessment/components/dataTable/table/cell/placeholder'
import useCellClassName from '@webapp/app/assessment/components/dataTable/table/cell/useCellClassName'

const ComponentsByType = {
  [SectionSpec.TYPES.calculated]: Calculated,
  [SectionSpec.TYPES.text]: Text,
  [SectionSpec.TYPES.textarea]: Text,
  [SectionSpec.TYPES.decimal]: Number,
  [SectionSpec.TYPES.integer]: Number,
  [SectionSpec.TYPES.select]: Select,
  [SectionSpec.TYPES.placeholder]: Placeholder,
}

const Cell = props => {
  const { data, assessmentType, sectionName, tableName, disabled, rowIdx, col, updateTableDataCell } = props

  const { type } = col
  const datum = R.pathOr(null, [rowIdx, col.idx])(data)

  const className = useCellClassName(col, rowIdx)

  const component = ComponentsByType[type]
  return (
    <td className={className}>
      {component &&
        React.createElement(component, {
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
