import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'

import TextInput from '@webapp/components/textInput'

const Text = props => {
  const { assessmentType, sectionName, tableName, updateTableDataCell, rowIdx, col, datum, disabled } = props

  const dispatch = useDispatch()

  return (
    <TextInput
      value={datum}
      onChange={e => {
        const { value } = e.target
        dispatch(updateTableDataCell(assessmentType, sectionName, tableName, rowIdx, col.idx, value))
      }}
      onPaste={() => {
        // TODO
      }}
      disabled={disabled}
    />
  )
}

Text.propTypes = {
  assessmentType: PropTypes.string.isRequired,
  sectionName: PropTypes.string.isRequired,
  tableName: PropTypes.string.isRequired,
  rowIdx: PropTypes.number.isRequired,
  col: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired,
  datum: PropTypes.any,
  updateTableDataCell: PropTypes.func.isRequired,
}

Text.defaultProps = {
  datum: null,
}

export default Text
