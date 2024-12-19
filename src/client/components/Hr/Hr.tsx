import './Hr.scss'
import React from 'react'

import classNames from 'classnames'

type Props = {
  className?: string
}

const Hr: React.FC<Props> = (props: Props) => {
  const { className } = props
  return <div className={classNames('hr', className)} />
}

Hr.defaultProps = {
  className: undefined,
}

export default Hr
