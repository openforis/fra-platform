import './InputRange.scss'
import React, { forwardRef, InputHTMLAttributes, useEffect, useImperativeHandle, useRef } from 'react'

import classNames from 'classnames'

export enum InputRangeSize {
  xs = 'xs',
  s = 's',
}

type Props = Pick<InputHTMLAttributes<HTMLInputElement>, 'disabled' | 'max' | 'min' | 'onChange' | 'step' | 'value'> & {
  size?: InputRangeSize
  unit?: string | null
}

const InputRange = forwardRef<HTMLInputElement, Props>((props, outerRef) => {
  const { disabled, max, min, onChange, size, step, unit, value } = props

  const inputRef = useRef<HTMLInputElement>(null)
  useImperativeHandle(outerRef, () => inputRef.current!, [])

  useEffect(() => {
    inputRef.current?.style?.setProperty('--percentage', `${value}%`)
  }, [value])

  return (
    <div className={classNames('input-range', `size-${size}`, { disabled })}>
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
  size: InputRangeSize.s,
  unit: null,
}

export default InputRange
