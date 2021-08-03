import React from 'react'

import { TypeSpec } from '@webapp/sectionSpec'

import { ThousandSeparatedDecimalInput } from '@webapp/components/thousandSeparatedDecimalInput'
import { ThousandSeparatedIntegerInput } from '@webapp/components/thousandSeparatedIntegerInput'
import { PropsCell } from '../props'

const Number: React.FC<PropsCell> = (props) => {
  const { onChange, onPaste, col, datum, disabled } = props

  const [Component, componentProps] =
    col.type === TypeSpec.decimal
      ? [ThousandSeparatedDecimalInput, { numberValue: datum }]
      : [ThousandSeparatedIntegerInput, { integerValue: datum }]

  return React.createElement(Component, { ...componentProps, onChange, onPaste, disabled })
}

export default Number
