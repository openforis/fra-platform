import React from 'react'

import { ColType } from '@meta/assessment'
import TextInput from '@client/components/TextInput'
import VerticallyGrowingTextField from '@client/components/VerticallyGrowingTextField'
import { PropsCell } from '../props'

const Text: React.FC<PropsCell> = (props) => {
  const { onChange, onPaste, col, datum, disabled } = props

  const [Component, componentProps] =
    col.props.colType === ColType.text ? [TextInput, {}] : [VerticallyGrowingTextField, { minWidth: 350 }]

  return React.createElement(Component, { ...componentProps, value: datum || '', onChange, onPaste, disabled })
}

export default Text
