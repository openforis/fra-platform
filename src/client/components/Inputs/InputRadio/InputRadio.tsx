import React, { forwardRef, InputHTMLAttributes } from 'react'

type Props = Pick<InputHTMLAttributes<HTMLInputElement>, 'checked' | 'disabled' | 'id' | 'onChange' | 'value'>

const InputRadio = forwardRef<HTMLInputElement, Props>((props, outerRef) => {
  const { checked, disabled, id, onChange, value } = props

  return (
    <input
      ref={outerRef}
      checked={checked}
      disabled={disabled}
      id={id}
      onChange={onChange}
      type="radio"
      value={value}
    />
  )
})

export default InputRadio
