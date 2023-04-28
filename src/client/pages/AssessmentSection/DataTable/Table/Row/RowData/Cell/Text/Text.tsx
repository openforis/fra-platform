import React from 'react'

import { ColType } from '@meta/assessment'

import TextInput from '@client/components/TextInput'
import VerticallyGrowingTextField from '@client/components/VerticallyGrowingTextField'

import { PropsCell } from '../props'

const Text: React.FC<PropsCell> = (props) => {
  const { onChange, onPaste, col, nodeValue, disabled } = props
  const value = nodeValue?.raw || ''

  const [Component, componentProps] =
    col.props.colType === ColType.text ? [TextInput, {}] : [VerticallyGrowingTextField, { minWidth: 350 }]

  const { inputPlaceholder } = col.props

  return React.createElement(Component, {
    ...componentProps,
    value,
    onChange,
    onPaste,
    disabled,
    placeholder: inputPlaceholder || 'write here',
  })
}

export default Text
