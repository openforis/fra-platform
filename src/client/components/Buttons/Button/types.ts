import React, { InputHTMLAttributes } from 'react'

import { TooltipId } from 'meta/tooltip/id'

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
  transparent = 'transparent',
}

export type ButtonProps = Pick<
  InputHTMLAttributes<HTMLButtonElement>,
  'className' | 'disabled' | 'onClick' | 'onMouseEnter' | 'onMouseLeave'
> & {
  dataTooltipContent?: string | null
  dataTooltipId?: TooltipId
  icon?: React.ReactNode
  iconName?: string
  inverse?: boolean
  label?: React.ReactNode
  noBorder?: boolean
  noPrint?: boolean
  size?: ButtonSize
  type?: ButtonType
}
