import React from 'react'

import Button, { ButtonSize, ButtonType } from 'client/components/Buttons/Button'
import { IconName } from 'client/components/Icon/types'

type Props = {
  onClick: () => void
}

const ButtonDelete: React.FC<Props> = (props) => {
  const { onClick } = props

  return (
    <Button
      iconName={IconName.trashSimple}
      inverse
      noBorder
      onClick={onClick}
      size={ButtonSize.m}
      type={ButtonType.danger}
    />
  )
}

export default ButtonDelete
