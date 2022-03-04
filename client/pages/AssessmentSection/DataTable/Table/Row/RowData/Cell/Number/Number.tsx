import React from 'react'

import { ColType } from '@meta/assessment'
import ThousandSeparatedDecimalInput from '@client/components/ThousandSeparatedDecimalInput'
import ThousandSeparatedIntegerInput from '@client/components/ThousandSeparatedIntegerInput'
import { PropsCell } from '../props'

const Number: React.FC<PropsCell> = (props) => {
  const { onChange, onPaste, col, datum, disabled } = props

  const [Component, componentProps] =
    col.props.colType === ColType.decimal
      ? [ThousandSeparatedDecimalInput, { numberValue: datum }]
      : [ThousandSeparatedIntegerInput, { integerValue: datum }]

  return React.createElement(Component, { ...componentProps, onChange, onPaste, disabled })
}

export default Number
