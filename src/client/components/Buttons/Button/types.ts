import React, { InputHTMLAttributes } from 'react'

export enum ButtonSize {
  xs = 'xs',
  s = 's',
  m = 'm',
  l = 'l',
}

export enum ButtonType {
  anonymous = 'anonymous',
  black = 'black',
  danger = 'danger',
  primary = 'primary',
}

export type ButtonProps = Pick<InputHTMLAttributes<HTMLButtonElement>, 'className' | 'disabled' | 'onClick'> & {
  icon?: React.ReactNode
  iconName?: string
  inverse?: boolean
  label?: React.ReactNode
  noPrint?: boolean
  size?: ButtonSize
  type?: ButtonType
}
