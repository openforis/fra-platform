import React from 'react'
import PropTypes from 'prop-types'
import * as R from 'ramda'

import Calculated from '@webapp/app/assessment/components/dataTable/table/cell/calculated'
import Decimal from '@webapp/app/assessment/components/dataTable/table/cell/decimal'
import useCellClassName from '@webapp/app/assessment/components/dataTable/table/cell/useCellClassName'

const ComponentsByType = {
  'calculated': Calculated,
  'decimal': Decimal,
}

const Cell = props => {
  const {
    data, sectionName, disabled,
    rowIdx, colIdx, col,
    // pasteUpdate,
  } = props

  const { type } = col
  const datum = R.pathOr(null, [rowIdx, colIdx])(data)

  const className = useCellClassName(col, datum)

  return (
    <td className={className}>
      {
        React.createElement(
          ComponentsByType[type],
          { datum, sectionName, disabled, col, colIdx, rowIdx }
        )
      }
    </td>
  )
}

Cell.propTypes = {
  data: PropTypes.array.isRequired,
  sectionName: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  rowIdx: PropTypes.number.isRequired,
  colIdx: PropTypes.number.isRequired,
  col: PropTypes.object.isRequired,
}

export default Cell
