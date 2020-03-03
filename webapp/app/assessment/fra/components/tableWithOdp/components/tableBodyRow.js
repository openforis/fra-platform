import React from 'react'
import PropTypes from 'prop-types'

import TableBodyRowField from '@webapp/app/assessment/fra/components/tableWithOdp/components/tableBodyRowField'
import TableBodyRowValidation
  from '@webapp/app/assessment/fra/components/tableWithOdp/components/tableBodyRowValidation'

const rowRenderers = {
  field: TableBodyRowField,
  validationErrors: TableBodyRowValidation,
  custom: ({ row, fra }) => row.render(fra),
}

const TableBodyRow = props => {
  const { row } = props

  const { type } = row

  const renderer = rowRenderers[type]
  if (!renderer) {
    console.error('Missing renderer for table row', renderer)
  }
  return React.createElement(renderer, props)
}

TableBodyRow.propTypes = {
  fra: PropTypes.array.isRequired,
  section: PropTypes.string.isRequired,
  row: PropTypes.object.isRequired,
  rowIdx: PropTypes.number.isRequired,
  disabled: PropTypes.bool.isRequired,
}

export default TableBodyRow
