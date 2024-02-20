import React, { InputHTMLAttributes } from 'react'

export enum ButtonSize {
  xs = 'xs',
  s = 's',
  m = 'm',
}

export enum ButtonType {
  danger = 'danger',
  primary = 'primary',
}

export type ButtonProps = Pick<InputHTMLAttributes<HTMLButtonElement>, 'className' | 'disabled' | 'onClick'> & {
  iconName?: string
  inverse?: boolean
  label?: React.ReactNode
  size?: ButtonSize
  type?: ButtonType
}
