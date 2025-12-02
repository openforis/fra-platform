import { LinkProps as ReactRouterLinkProps } from 'react-router'

export enum LinkColor {
  blue = 'blue',
  body = 'body',
}

export type LinkProps = Pick<
  ReactRouterLinkProps,
  'className' | 'children' | 'data-tooltip-content' | 'data-tooltip-id' | 'rel' | 'target' | 'to'
> & {
  color?: LinkColor
  oneLine?: boolean
}
