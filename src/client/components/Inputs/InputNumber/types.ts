import { InputHTMLAttributes } from 'react'

export type InputNumberProps = Pick<
  InputHTMLAttributes<HTMLInputElement>,
  'disabled' | 'id' | 'maxLength' | 'onChange' | 'onPaste' | 'placeholder' | 'value'
> & {
  precision?: number
}
