import './ButtonClear.scss'
import React from 'react'
import classNames from 'classnames'

import Button, { ButtonSize, ButtonType } from 'client/components/Buttons/Button'

type Props = {
  className?: string
  onClick?: (event: React.MouseEvent) => void
}

const ButtonClear: React.FC<Props> = (props) => {
  const { className, onClick } = props

  return (
    <Button
      className={classNames('button-clear', className)}
      iconName="remove"
      inverse
      onClick={onClick}
      size={ButtonSize.m}
      type={ButtonType.anonymous}
    />
  )
}

export default ButtonClear
