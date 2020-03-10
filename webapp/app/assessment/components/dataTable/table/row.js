import React from 'react'
import PropTypes from 'prop-types'

import RowData from '@webapp/app/assessment/components/dataTable/table/rowData'
import RowValidation from '@webapp/app/assessment/components/dataTable/table/rowValidation'
import useUserInfo from '@webapp/components/hooks/useUserInfo'

const rowRenderers = {
  data: RowData,
  validationErrors: RowValidation,
}

const Row = props => {
  const userInfo = useUserInfo()

  const { row } = props
  const { type, render } = row

  // validation error rows are hidden in public view
  if (type === 'validationErrors' && !userInfo) {
    return null
  }

  const renderer = type === 'custom' ? render : rowRenderers[type]
  if (!renderer) {
    console.error('Missing renderer for table row', renderer)
  }
  return React.createElement(renderer, props)
}

Row.propTypes = {
  data: PropTypes.array.isRequired,
  assessmentType: PropTypes.string.isRequired,
  sectionName: PropTypes.string.isRequired,
  tableName: PropTypes.string.isRequired,
  row: PropTypes.object.isRequired,
  rowIdx: PropTypes.number.isRequired,
  disabled: PropTypes.bool.isRequired,
  pasteUpdate: PropTypes.func.isRequired, //TODO - check
}

export default Row
