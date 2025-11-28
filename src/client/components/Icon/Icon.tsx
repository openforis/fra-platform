import './Icon.scss'
import React from 'react'
import classNames from 'classnames'

import { UUIDs } from 'meta/uuid/uuids'

const bustString = UUIDs.getUuid()

type Props = {
  name: string
  className?: string
}

const Icon: React.FC<Props> = (props) => {
  const { className, name } = props

  return (
    <svg className={classNames('icon', className, `icon_${name}`)} xmlns="http://www.w3.org/2000/svg">
      <use xlinkHref={`/img/icons.svg?bust=${bustString}#${name}`} />
    </svg>
  )
}

export default Icon
