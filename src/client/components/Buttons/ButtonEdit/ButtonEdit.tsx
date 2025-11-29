import React from 'react'
import { Link } from 'react-router'

import Button, { ButtonProps, ButtonSize, useButtonClassName } from 'client/components/Buttons/Button'
import Icon from 'client/components/Icon'

type PropsLink = {
  url: string
}

type PropsButton = {
  onClick: () => void
}

type Props = PropsLink | PropsButton

const ButtonEdit: React.FC<Props> = (props) => {
  const buttonProps: Partial<ButtonProps> = { iconName: 'pencil', inverse: true, noBorder: true, size: ButtonSize.m }

  const linkClassName = useButtonClassName(buttonProps)

  if ('url' in props) {
    const { url } = props
    return (
      <Link className={linkClassName} to={url} type="button">
        <Icon name="pencil" />
      </Link>
    )
  }

  const { onClick } = props
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Button onClick={onClick} {...buttonProps} />
  )
}

export default ButtonEdit
