import './InputPercent.scss'
import React, { forwardRef, InputHTMLAttributes, useEffect, useImperativeHandle, useRef, useState } from 'react'

import classNames from 'classnames'

import { useOnBlur } from './hooks/useOnBlur'
import { useOnChange } from './hooks/useOnChange'

type Props = Pick<
  InputHTMLAttributes<HTMLInputElement>,
  'disabled' | 'id' | 'maxLength' | 'onPaste' | 'placeholder' | 'value'
> &
  Pick<InputHTMLAttributes<HTMLDivElement>, 'className'> & {
    onChange: (value?: string) => void
    precision?: number
  }

const InputPercent = forwardRef<HTMLInputElement, Props>((props, outerRef) => {
  const { className, disabled, id, maxLength, onChange, onPaste, placeholder, precision, value } = props

  const inputRef = useRef<HTMLInputElement>(null)
  useImperativeHandle(outerRef, () => inputRef.current!, [])

  const [localValue, setLocalValue] = useState<typeof value>(value)
  const [focused, setFocused] = useState<boolean>(false)

  const _onChange = useOnChange({ inputRef, onChange, setLocalValue, value: localValue })
  const _onBlur = useOnBlur({ onChange, precision, value })

  useEffect(() => {
    if (!focused) setLocalValue(value)
  }, [value, focused])

  return (
    <div className={classNames('input-percent', { disabled }, className)}>
      <input
        ref={inputRef}
        disabled={disabled}
        id={id}
        maxLength={maxLength}
        onBlur={(e) => {
          _onBlur(e)
          setFocused(false)
        }}
        onChange={_onChange}
        onFocus={() => setFocused(true)}
        onPaste={onPaste}
        placeholder={placeholder}
        type="text"
        value={localValue ?? ''}
      />
      <span className="input-percent__sign">%</span>
    </div>
  )
})

InputPercent.defaultProps = {
  precision: 3,
}

export default InputPercent
