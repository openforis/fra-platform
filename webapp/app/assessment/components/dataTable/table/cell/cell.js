import React from 'react'
import PropTypes from 'prop-types'
import * as R from 'ramda'

import Calculated from '@webapp/app/assessment/components/dataTable/table/cell/calculated'
import Decimal from '@webapp/app/assessment/components/dataTable/table/cell/decimal'
import useCellClassName from '@webapp/app/assessment/components/dataTable/table/cell/useCellClassName'

const ComponentsByType = {
  calculated: Calculated,
  decimal: Decimal,
}

const Cell = props => {
  const {
    data,
    assessmentType,
    sectionName,
    tableName,
    disabled,
    rowIdx,
    col,
    // pasteUpdate,
  } = props

  const { type } = col
  const datum = R.pathOr(null, [rowIdx, col.idx])(data)

  const className = useCellClassName(col, datum)

  return (
    <td className={className}>
      {React.createElement(ComponentsByType[type], {
        datum,
        assessmentType,
        sectionName,
        tableName,
        disabled,
        col,
        rowIdx,
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
}

export default Cell
