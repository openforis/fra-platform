import '../Link.scss'
import classNames from 'classnames'

import { LinkColor, LinkProps } from 'client/components/Links/Link/types'

type Props = Pick<LinkProps, 'className' | 'color' | 'oneLine'>

const defaults: Partial<Props> = {
  color: LinkColor.blue,
}

export const useLinkClassName = (props: Props = {}): string => {
  const { className, color = defaults.color, oneLine } = props

  return classNames(`link`, { [`color-${color}`]: color, 'one-line': oneLine }, className)
}
