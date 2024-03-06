import './ButtonClose.scss'
import React, { HTMLAttributes } from 'react'

import classNames from 'classnames'

import Icon from 'client/components/Icon'

type Props = Pick<HTMLAttributes<HTMLButtonElement>, 'className'> & {
  onClick: () => void
}

const ButtonClose: React.FC<Props> = (props) => {
  const { className, onClick } = props

  return (
    <button className={classNames('btn-s btn-close', className)} onClick={onClick} type="button">
      <Icon name="remove" />
    </button>
  )
}

export default ButtonClose
