import './Button.scss'
import React from 'react'

import { ButtonProps } from 'client/components/Buttons/Button/types'
import Icon from 'client/components/Icon'

import { useButtonClassName } from './hooks/useButtonClassName'

const defaults: Partial<ButtonProps> = {
  htmlButtonType: 'button',
}

const Button: React.FC<ButtonProps> = (props) => {
  const {
    dataTooltipContent,
    dataTooltipId,
    disabled,
    htmlButtonType = defaults.htmlButtonType,
    icon,
    iconName,
    label,
    onClick,
    onMouseEnter,
    onMouseLeave,
  } = props

  const className = useButtonClassName(props)

  return (
    <button
      className={className}
      data-tooltip-content={dataTooltipContent}
      data-tooltip-id={dataTooltipId}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      type={htmlButtonType}
    >
      {iconName && !icon && <Icon name={iconName} />}
      {icon && icon}
      {label}
    </button>
  )
}

export default Button
