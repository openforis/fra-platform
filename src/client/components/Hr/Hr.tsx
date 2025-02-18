import './Hr.scss'
import React from 'react'

import classNames from 'classnames'

type Props = {
  className?: string
  vertical?: boolean
}

const Hr: React.FC<Props> = (props: Props) => {
  const { className, vertical } = props
  return <div className={classNames('hr', { vertical }, className)} />
}

Hr.defaultProps = {
  className: undefined,
  vertical: false,
}

export default Hr
