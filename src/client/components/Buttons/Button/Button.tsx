import './Button.scss'
import React from 'react'

import { ButtonProps } from 'client/components/Buttons/Button/types'
import Icon from 'client/components/Icon'

import { useButtonClassName } from './hooks/useButtonClassName'

const Button: React.FC<ButtonProps> = (props) => {
  const { dataTooltipContent, dataTooltipId, disabled, icon, iconName, label, onClick, onMouseEnter, onMouseLeave } =
    props

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
      type="button"
    >
      {iconName && !icon && <Icon className="icon-sub icon-white" name={iconName} />}
      {icon && icon}
      {label}
    </button>
  )
}

export default Button
