import React from 'react'
import * as PropTypes from 'prop-types'

import * as SectionSpec from '@webapp/app/assessment/components/section/sectionSpec'

import { ThousandSeparatedDecimalInput } from '@webapp/components/thousandSeparatedDecimalInput'
import { ThousandSeparatedIntegerInput } from '@webapp/components/thousandSeparatedIntegerInput'

const Number = (props: any) => {
  const { onChange, onPaste, col, datum, disabled } = props

  const [Component, componentProps] = SectionSpec.isDecimal(col)
    ? [ThousandSeparatedDecimalInput, { numberValue: datum }]
    : [ThousandSeparatedIntegerInput, { integerValue: datum }]

  return React.createElement(Component, { ...componentProps, onChange, onPaste, disabled })
}

Number.propTypes = {
  col: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired,
  datum: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  onPaste: PropTypes.func.isRequired,
}

Number.defaultProps = {
  datum: null,
}

export default Number
