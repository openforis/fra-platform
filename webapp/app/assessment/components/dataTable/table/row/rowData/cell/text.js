import React from 'react'
import PropTypes from 'prop-types'

import * as SectionSpec from '@webapp/app/assessment/components/section/sectionSpec'

import TextInput from '@webapp/components/textInput'
import VerticallyGrowingTextField from '@webapp/components/verticallyGrowingTextField'

const Text = (props) => {
  const { onChange, onPaste, col, datum, disabled } = props

  const [Component, componentProps] = SectionSpec.isText(col)
    ? [TextInput, {}]
    : [VerticallyGrowingTextField, { minWidth: 350 }]

  return React.createElement(Component, { ...componentProps, value: datum || '', onChange, onPaste, disabled })
}

Text.propTypes = {
  col: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired,
  datum: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  onPaste: PropTypes.func.isRequired,
}

Text.defaultProps = {
  datum: null,
}

export default Text
