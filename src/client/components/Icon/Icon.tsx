import React from 'react'

import classNames from 'classnames'

import bustString from './cacheBust'

type Props = {
  name: string
  className?: string
}

const Icon = (props: Props) => {
  const { name, className } = props

  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={classNames('icon', className, `icon_${name}`)}>
      <use xlinkHref={`/img/icons.svg?bust=${bustString}#${name}`} />
    </svg>
  )
}

Icon.defaultProps = {
  className: null,
}

export default Icon
