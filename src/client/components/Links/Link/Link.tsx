import React from 'react'
import { Link as ReactRouterLink } from 'react-router-dom'

import { LinkProps } from 'client/components/Links/Link/types'

import { useLinkClassName } from './hooks/useLinkClassName'

const Link: React.FC<LinkProps> = (props) => {
  const { children, className, color, oneLine, rel, target, to } = props
  // tooltip props
  const { 'data-tooltip-content': tooltipContent, 'data-tooltip-id': tooltipId } = props

  const linkClassName = useLinkClassName({ className, oneLine, color })

  return (
    <ReactRouterLink
      className={linkClassName}
      data-tooltip-content={tooltipContent}
      data-tooltip-id={tooltipId}
      rel={rel}
      target={target}
      to={to}
    >
      {React.Children.toArray(children)}
    </ReactRouterLink>
  )
}

export default Link
