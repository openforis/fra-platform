import './InputPercent.scss'
import React, { forwardRef } from 'react'

import InputNumber from 'client/components/Inputs/InputNumber'
import { InputNumberProps } from 'client/components/Inputs/InputNumber/types'

const InputPercent = forwardRef<HTMLInputElement, InputNumberProps>((_props, outerRef) => {
  const { precision = 3, ...props } = _props

  return (
    <div className="input-percent">
      {/* eslint-disable-next-line react/jsx-props-no-spreading  */}
      <InputNumber {...props} ref={outerRef} precision={precision} />
      <span className="input-percent__sign">%</span>
    </div>
  )
})

export default InputPercent
