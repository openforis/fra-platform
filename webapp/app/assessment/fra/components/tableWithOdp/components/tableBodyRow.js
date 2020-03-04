import React from 'react'
import PropTypes from 'prop-types'

import TableBodyRowField from '@webapp/app/assessment/fra/components/tableWithOdp/components/tableBodyRowField'
import TableBodyRowValidation
  from '@webapp/app/assessment/fra/components/tableWithOdp/components/tableBodyRowValidation'
import useUserInfo from '@webapp/components/hooks/useUserInfo'

const rowRenderers = {
  field: TableBodyRowField,
  validationErrors: TableBodyRowValidation,
}

const TableBodyRow = props => {
  const userInfo = useUserInfo()

  const { row } = props
  const { type, render } = row

  // validation error rows are hidden in public view
  if (type === 'validationErrors' && !userInfo) {
    return null
  }

  const renderer = type === 'custom' ? render :rowRenderers[type]
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
  pasteUpdate: PropTypes.func.isRequired,
}

export default TableBodyRow
