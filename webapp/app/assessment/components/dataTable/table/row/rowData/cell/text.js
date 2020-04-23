import React from 'react'
import PropTypes from 'prop-types'

import * as SectionSpec from '@webapp/app/assessment/components/section/sectionSpec'

import TextInput from '@webapp/components/textInput'
import VerticallyGrowingTextField from '@webapp/components/verticallyGrowingTextField'

import useOnChange from './useOnChange'

const Text = (props) => {
  const { assessmentType, sectionName, tableName, updateTableDataCell, rowIdx, col, datum, disabled } = props
  const onChange = useOnChange({ assessmentType, sectionName, tableName, updateTableDataCell, rowIdx, col, datum })

  const [Component, componentProps] = SectionSpec.isText(col)
    ? [TextInput, {}]
    : [VerticallyGrowingTextField, { minWidth: 350 }]

  return React.createElement(Component, { ...componentProps, value: datum || '', onChange, disabled })
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
