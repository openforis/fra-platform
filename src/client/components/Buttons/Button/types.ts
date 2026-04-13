import React, { ButtonHTMLAttributes } from 'react'
import { PlacesType } from 'react-tooltip'

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
  secondary = 'secondary',
  transparent = 'transparent',
}

type HtmlButtonProps = ButtonHTMLAttributes<HTMLButtonElement>
export type ButtonProps = Pick<
  HtmlButtonProps,
  'className' | 'disabled' | 'onClick' | 'onMouseEnter' | 'onMouseLeave'
> & {
  bgTransparent?: boolean
  dataTooltipContent?: string | null
  dataTooltipId?: TooltipId
  dataTooltipPlace?: PlacesType
  htmlButtonType?: HtmlButtonProps['type']
  icon?: React.ReactNode
  iconName?: string
  inverse?: boolean
  label?: React.ReactNode
  noBorder?: boolean
  noPrint?: boolean
  size?: ButtonSize
  type?: ButtonType
}
