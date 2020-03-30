import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'

import * as SectionSpec from '@webapp/app/assessment/components/section/sectionSpec'

import TextInput from '@webapp/components/textInput'
import VerticallyGrowingTextField from '@webapp/components/verticallyGrowingTextField'

const Text = props => {
  const { assessmentType, sectionName, tableName, updateTableDataCell, rowIdx, col, datum, disabled } = props
  const { type } = col

  const dispatch = useDispatch()

  const [Component, componentProps] =
    type === SectionSpec.TYPES.text ? [TextInput, {}] : [VerticallyGrowingTextField, { minWidth: 350 }]

  const onChange = e => {
    const { value } = e.target
    dispatch(updateTableDataCell(assessmentType, sectionName, tableName, rowIdx, col.idx, value))
  }

  const onPaste = () => {
    // TODO
  }

  return React.createElement(Component, { ...componentProps, value: datum || '', onChange, onPaste, disabled })
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
