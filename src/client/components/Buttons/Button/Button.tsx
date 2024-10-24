import './Button.scss'
import React from 'react'

import { ButtonProps } from 'client/components/Buttons/Button/types'
import Icon from 'client/components/Icon'

import { useButtonClassName } from './hooks/useButtonClassName'

const Button: React.FC<ButtonProps> = (props) => {
  const { disabled, icon, iconName, label, onClick } = props

  const className = useButtonClassName(props)

  return (
    <button className={className} disabled={disabled} onClick={onClick} type="button">
      {iconName && !icon && <Icon className="icon-sub icon-white" name={iconName} />}
      {icon && icon}
      {label}
    </button>
  )
}

export default Button
