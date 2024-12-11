import './Number.scss'
import React from 'react'

import { ColType } from 'meta/assessment'

import InputNumber from 'client/components/Inputs/InputNumber'

import { PropsCell } from '../props'

const Number: React.FC<PropsCell> = (props) => {
  const { onChange, onPaste, col, nodeValue, disabled } = props
  const value = nodeValue?.raw ?? null

  const precision = col.props.colType === ColType.integer ? 0 : 2

  return (
    <InputNumber
      className="table-grid__data-cell-input-number"
      disabled={disabled}
      onChange={onChange}
      onPaste={onPaste}
      precision={precision}
      value={value}
    />
  )
}

export default Number
