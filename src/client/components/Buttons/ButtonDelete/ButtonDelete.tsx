import React from 'react'

import Button, { ButtonSize, ButtonType } from 'client/components/Buttons/Button'

type Props = {
  onClick: () => void
}

const ButtonDelete: React.FC<Props> = (props) => {
  const { onClick } = props

  return (
    <Button iconName="trash-simple" inverse noBorder onClick={onClick} size={ButtonSize.m} type={ButtonType.danger} />
  )
}

export default ButtonDelete
