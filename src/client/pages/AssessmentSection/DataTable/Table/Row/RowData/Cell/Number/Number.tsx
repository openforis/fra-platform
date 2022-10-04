import React from 'react'

import { ColType } from '@meta/assessment'

import ThousandSeparatedDecimalInput from '@client/components/ThousandSeparatedDecimalInput'
import ThousandSeparatedIntegerInput from '@client/components/ThousandSeparatedIntegerInput'

import { PropsCell } from '../props'

const Number: React.FC<PropsCell> = (props) => {
  const { onChange, onPaste, col, nodeValue, disabled } = props

  const [Component, componentProps] =
    col.props.colType === ColType.decimal
      ? [ThousandSeparatedDecimalInput, { numberValue: nodeValue.raw }]
      : [ThousandSeparatedIntegerInput, { integerValue: nodeValue.raw }]

  return React.createElement(Component, { ...componentProps, onChange, onPaste, disabled })
}

export default Number
