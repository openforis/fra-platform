import React from 'react'

import { ColType } from 'meta/assessment'

import InputNumber from 'client/components/Inputs/InputNumber'

import { PropsCell } from '../props'

const Number: React.FC<PropsCell> = (props) => {
  const { onChange, onPaste, col, nodeValue, disabled } = props
  const value = nodeValue?.raw ?? null

  if (col.props.colType === ColType.integer) {
    return (
      <InputNumber
        disabled={disabled}
        isInteger
        onChange={onChange}
        onPaste={onPaste}
        thousandSeparated
        value={value}
      />
    )
  }

  return <InputNumber disabled={disabled} onChange={onChange} onPaste={onPaste} thousandSeparated value={value} />
}

export default Number
