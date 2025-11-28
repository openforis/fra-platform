import { InputHTMLAttributes } from 'react'

export type InputTextProps = Pick<
  InputHTMLAttributes<HTMLInputElement>,
  | 'className'
  | 'disabled'
  | 'id'
  | 'onBlur'
  | 'onChange'
  | 'onClick'
  | 'onFocus'
  | 'onPaste'
  | 'placeholder'
  | 'type'
  | 'value'
> & { bordered?: boolean; resize?: boolean }
