import React from 'react'
import * as bustString from './cacheBust'

type Props = {
  name: string
  className?: string
}

const Icon = (props: Props) => {
  const svgClass = (props as any).className ? `icon ${(props as any).className}` : 'icon'
  const { name } = props
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={svgClass}>
      <use xlinkHref={`/img/icons.svg?bust=${bustString}#${name}`} />
    </svg>
  )
}
export default Icon
