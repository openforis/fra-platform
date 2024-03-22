import './InputRange.scss'
import React, { forwardRef, InputHTMLAttributes, useEffect, useImperativeHandle, useRef } from 'react'

type Props = Pick<InputHTMLAttributes<HTMLInputElement>, 'disabled' | 'max' | 'min' | 'onChange' | 'step' | 'value'> & {
  unit?: string | null
}

const InputRange = forwardRef<HTMLInputElement, Props>((props, outerRef) => {
  const { disabled, max, min, onChange, step, unit, value } = props

  const inputRef = useRef<HTMLInputElement>(null)
  useImperativeHandle(outerRef, () => inputRef.current!, [])

  useEffect(() => {
    inputRef.current?.style?.setProperty('--percentage', `${value}%`)
  }, [value])

  return (
    <div className="input-range">
      <input
        ref={inputRef}
        disabled={disabled}
        max={max}
        min={min}
        onChange={onChange}
        step={step}
        type="range"
        value={value}
      />
      {unit && <span className="input-range-value">{`${value}${unit}`}</span>}
    </div>
  )
})

InputRange.defaultProps = {
  unit: null,
}

export default InputRange
