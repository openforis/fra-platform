import './Hr.scss'
import React from 'react'

import classNames from 'classnames'

type Props = {
  className?: string
  vertical?: boolean
  dark?: boolean
}

const Hr: React.FC<Props> = (props: Props) => {
  const { className, vertical, dark } = props
  return <div className={classNames('hr', { vertical, dark }, className)} />
}

export default Hr
