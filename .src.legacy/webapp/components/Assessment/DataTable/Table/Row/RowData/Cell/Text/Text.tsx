import React from 'react'

import { TypeSpec } from '@webapp/sectionSpec'

import TextInput from '@webapp/components/textInput'
import VerticallyGrowingTextField from '@webapp/components/verticallyGrowingTextField'
import { PropsCell } from '../props'

const Text: React.FC<PropsCell> = (props) => {
  const { onChange, onPaste, col, datum, disabled } = props

  const [Component, componentProps] =
    col.type === TypeSpec.text ? [TextInput, {}] : [VerticallyGrowingTextField, { minWidth: 350 }]

  return React.createElement(Component, { ...componentProps, value: datum || '', onChange, onPaste, disabled })
}

export default Text
