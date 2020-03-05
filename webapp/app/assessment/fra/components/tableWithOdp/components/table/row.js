import React from 'react'
import PropTypes from 'prop-types'

import RowField from '@webapp/app/assessment/fra/components/tableWithOdp/components/table/rowField'
import RowValidation
  from '@webapp/app/assessment/fra/components/tableWithOdp/components/table/rowValidation'
import useUserInfo from '@webapp/components/hooks/useUserInfo'

const rowRenderers = {
  field: RowField,
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

  const renderer = type === 'custom' ? render :rowRenderers[type]
  if (!renderer) {
    console.error('Missing renderer for table row', renderer)
  }
  return React.createElement(renderer, props)
}

Row.propTypes = {
  fra: PropTypes.array.isRequired,
  section: PropTypes.string.isRequired,
  row: PropTypes.object.isRequired,
  rowIdx: PropTypes.number.isRequired,
  disabled: PropTypes.bool.isRequired,
  pasteUpdate: PropTypes.func.isRequired,
}

export default Row
