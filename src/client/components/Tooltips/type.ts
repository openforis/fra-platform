import { ReactNode } from 'react'

export enum TooltipType {
  black = 'black-tooltip',
  error = 'error-tooltip',
  info = 'info-tooltip',
  success = 'success-tooltip',
  white = 'white-tooltip',
}

export type TooltipProps = {
  type?: TooltipType
  className?: string
  content?: ReactNode
}
