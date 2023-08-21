import React from 'react'

import { ColType } from 'meta/assessment'

import ThousandSeparatedDecimalInput from 'client/components/ThousandSeparatedDecimalInput'
import ThousandSeparatedIntegerInput from 'client/components/ThousandSeparatedIntegerInput'

import { PropsCell } from '../props'

const Number: React.FC<PropsCell> = (props) => {
  const { onChange, onPaste, col, nodeValue, disabled } = props
  const value = nodeValue?.raw ?? null

  const [Component, componentProps] =
    col.props.colType === ColType.decimal
      ? [ThousandSeparatedDecimalInput, { numberValue: value }]
      : [ThousandSeparatedIntegerInput, { integerValue: value }]

  return React.createElement(Component, { ...componentProps, onChange, onPaste, disabled })
}

export default Number
