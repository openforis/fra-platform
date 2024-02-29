import './InputRange.scss'
import React, { forwardRef, InputHTMLAttributes } from 'react'

type Props = Pick<InputHTMLAttributes<HTMLInputElement>, 'disabled' | 'max' | 'min' | 'onChange' | 'step' | 'value'> & {
  unit?: string | null
}

const InputRange = forwardRef<HTMLInputElement, Props>((props, outerRef) => {
  const { disabled, max, min, onChange, step, unit, value } = props

  return (
    <div className="input-range">
      <input
        disabled={disabled}
        max={max}
        min={min}
        onChange={onChange}
        ref={outerRef}
        step={step}
        type="range"
        value={value}
      />
      {unit && <span className="input-range-value">{`${value} ${unit}`}</span>}
    </div>
  )
})

InputRange.defaultProps = {
  unit: null,
}

export default InputRange
