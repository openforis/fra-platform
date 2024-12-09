import { InputHTMLAttributes } from 'react'

export type InputNumberProps = Pick<
  InputHTMLAttributes<HTMLInputElement>,
  'disabled' | 'id' | 'maxLength' | 'onChange' | 'onPaste' | 'placeholder' | 'value'
> & {
  isInteger?: boolean
  precision?: number
  shouldRound?: boolean
  thousandSeparated?: boolean
}
