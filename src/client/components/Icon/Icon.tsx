import React from 'react'
import bustString from './cacheBust'

type Props = {
  name: string
  className?: string
}

const Icon = (props: Props) => {
  const { name, className } = props
  const svgClass = className ? `icon ${className}` : 'icon'
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={svgClass}>
      <use xlinkHref={`/img/icons.svg?bust=${bustString}#${name}`} />
    </svg>
  )
}

Icon.defaultProps = {
  className: null,
}

export default Icon
