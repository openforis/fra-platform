import './Select.scss'
import React from 'react'
import ReactSelect from 'react-select'

import classNames from 'classnames'

import { ClearIndicator, DropdownIndicator, IndicatorsContainer } from 'client/components/Inputs/Select/Indicators'

import { useOnChange } from './hooks/useOnChange'
import { useValue } from './hooks/useValue'
import { SelectProps } from './types'

const Select: React.FC<SelectProps> = (props) => {
  const { disabled, isMulti, options, placeholder } = props

  const value = useValue(props)
  const onChange = useOnChange(props)

  return (
    <ReactSelect
      classNames={{
        container: () => classNames('select__container'),
        control: ({ isDisabled, isFocused }) => classNames('select__control', { isDisabled, isFocused }),
        group: () => 'select__group',
        groupHeading: () => 'select__groupHeading',
        input: ({ isDisabled }) => classNames('select__input', { isDisabled }),
        menu: ({ placement }) => classNames('select__menu', placement),
        menuList: () => classNames('select__menuList'),
        multiValue: ({ isDisabled }) => classNames('select__multiValue', { isDisabled }),
        multiValueLabel: ({ isDisabled }) => classNames('select__multiValueLabel', { isDisabled }),
        multiValueRemove: ({ isDisabled }) => classNames('select__multiValueRemove', { isDisabled }),
        option: ({ isFocused, isSelected }) => classNames('select__option', { isFocused, isSelected }),
        singleValue: () => 'select__singleValue',
        valueContainer: () => 'select__valueContainer',
      }}
      components={{ ClearIndicator, DropdownIndicator, IndicatorsContainer, IndicatorSeparator: null }}
      isClearable
      isDisabled={disabled}
      isMulti={isMulti}
      isSearchable
      menuPlacement="auto"
      menuPosition="fixed"
      onChange={onChange}
      options={options}
      placeholder={placeholder}
      value={value}
    />
  )
}

export default Select
