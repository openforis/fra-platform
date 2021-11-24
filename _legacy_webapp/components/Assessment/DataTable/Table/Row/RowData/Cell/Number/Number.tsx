import React from 'react'

import { TypeSpec } from '../../../../../../../../sectionSpec'

import { ThousandSeparatedDecimalInput } from '../../../../../../../../components/thousandSeparatedDecimalInput'
import { ThousandSeparatedIntegerInput } from '../../../../../../../../components/thousandSeparatedIntegerInput'
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
