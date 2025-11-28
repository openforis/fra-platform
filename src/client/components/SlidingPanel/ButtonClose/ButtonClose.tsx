import './ButtonClose.scss'
import React from 'react'

import Button, { ButtonSize, ButtonType } from 'client/components/Buttons/Button'

type Props = {
  onClick: () => void
}

const ButtonClose: React.FC<Props> = (props) => {
  const { onClick } = props

  return (
    <Button
      className="sliding-panel__close"
      iconName="remove"
      inverse
      onClick={onClick}
      size={ButtonSize.l}
      type={ButtonType.anonymous}
    />
  )
}

export default ButtonClose
