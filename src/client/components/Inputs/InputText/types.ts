import { InputHTMLAttributes } from 'react'

export type InputTextProps = Pick<
  InputHTMLAttributes<HTMLInputElement>,
  'className' | 'disabled' | 'id' | 'onBlur' | 'onChange' | 'onFocus' | 'onPaste' | 'placeholder' | 'value'
>
