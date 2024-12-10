import './InputPercent.scss'
import React, { forwardRef } from 'react'

import InputNumber from 'client/components/Inputs/InputNumber'
import { InputNumberProps } from 'client/components/Inputs/InputNumber/types'

const InputPercent = forwardRef<HTMLInputElement, InputNumberProps>((props, outerRef) => {
  return (
    <div className="input-percent">
      {/* eslint-disable-next-line react/jsx-props-no-spreading  */}
      <InputNumber {...props} ref={outerRef} />
      <span className="input-percent__sign">%</span>
    </div>
  )
})

InputPercent.defaultProps = {
  precision: 3,
}

export default InputPercent
