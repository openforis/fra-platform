import './Indicators.scss'
import React, { useEffect, useRef } from 'react'
import {
  ClearIndicatorProps,
  components,
  DropdownIndicatorProps,
  IndicatorsContainerProps,
  OptionProps,
} from 'react-select'

import classNames from 'classnames'

import Icon from 'client/components/Icon'
import { Option } from 'client/components/Inputs/Select'

import { useMultiSelectOptionConfig } from './hooks/useMultiSelectOptionConfig'

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

export const MultiSelectOption: React.FC<OptionProps<Option>> = (props) => {
  const { data, label } = props

  const { checked, isInputIndeterminate } = useMultiSelectOptionConfig(props)

  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = isInputIndeterminate
    }
  }, [isInputIndeterminate])

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <components.Option {...props}>
      <input
        key={`${data.value}-${isInputIndeterminate}`}
        ref={inputRef}
        checked={checked}
        className="select__toggleAllOption-checkbox"
        onChange={() => undefined}
        type="checkbox"
      />
      <span className="select__toggleAllOption-label">{label}</span>
    </components.Option>
  )
}
