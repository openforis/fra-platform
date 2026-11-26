import './Icon.scss'
import React from 'react'
import classNames from 'classnames'

import { iconComponents } from 'client/components/Icon/iconComponents'
import { IconName } from 'client/components/Icon/types'

type Props = {
  name: IconName
  className?: string
}

const Icon: React.FC<Props> = (props) => {
  const { className, name } = props

  const SvgIcon = iconComponents[name]

  return <SvgIcon className={classNames('icon', className, `icon_${name}`)} />
}

export default Icon
