import './Indicators.scss'
import React from 'react'
import { ClearIndicatorProps, components, DropdownIndicatorProps, IndicatorsContainerProps } from 'react-select'

import classNames from 'classnames'

import Icon from 'client/components/Icon'

export const IndicatorsContainer: React.FC<IndicatorsContainerProps> = (props) => {
  const { children, className, isDisabled, ...rest } = props

  return (
    <components.IndicatorsContainer
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      className={classNames(className, 'select__indicatorsContainer', { isDisabled })}
      isDisabled={isDisabled}
    >
      {React.Children.toArray(children)}
    </components.IndicatorsContainer>
  )
}

export const DropdownIndicator: React.FC<DropdownIndicatorProps> = (props) => {
  const { isDisabled } = props

  return (
    <div className={classNames('select__dropdownIndicator', { isDisabled })}>
      <Icon className="icon-sub" name="icon-select-arrows" />
    </div>
  )
}

export const ClearIndicator: React.FC<ClearIndicatorProps> = (props) => {
  const { className, ...rest } = props

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <components.ClearIndicator {...rest} className={classNames(className, 'select__clearIndicator')}>
      <Icon className="icon-sub" name="remove" />
    </components.ClearIndicator>
  )
}
