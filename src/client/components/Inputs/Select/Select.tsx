import './Select.scss'
import React from 'react'
import ReactSelect, { GroupBase, SelectComponentsConfig } from 'react-select'

import classNames from 'classnames'

import { ClearIndicator, DropdownIndicator, IndicatorsContainer } from 'client/components/Inputs/Select/Indicators'

import { useOnChange } from './hooks/useOnChange'
import { useToggleAllConfig } from './hooks/useToggleAllConfig'
import { useValue } from './hooks/useValue'
import { SelectProps } from './types'

const Select: React.FC<SelectProps> = (props) => {
  const { classNames: classes, disabled, isClearable, isMulti, options, placeholder, toggleAll } = props

  const value = useValue(props)
  const onChange = useOnChange(props)

  const components: Partial<SelectComponentsConfig<unknown, boolean, GroupBase<unknown>>> = {
    ClearIndicator,
    DropdownIndicator,
    IndicatorsContainer,
    IndicatorSeparator: null,
  }

  const { optionComponent, options: augmentedOptions } = useToggleAllConfig({ isMulti, options, toggleAll, value })

  if (optionComponent) {
    components.Option = optionComponent
  }

  return (
    <ReactSelect
      classNames={{
        container: () => classNames('select__container', classes?.container),
        control: ({ isDisabled, isFocused }) => classNames('select__control', { isDisabled, isFocused }),
        group: () => 'select__group',
        groupHeading: () => 'select__groupHeading',
        input: ({ isDisabled }) => classNames('select__input', { isDisabled }),
        menu: ({ placement }) => classNames('select__menu', placement),
        menuList: () => classNames('select__menuList'),
        multiValue: ({ isDisabled }) => classNames('select__multiValue', { isDisabled }),
        multiValueLabel: ({ isDisabled }) => classNames('select__multiValueLabel', { isDisabled }),
        multiValueRemove: ({ isDisabled }) => classNames('select__multiValueRemove', { isDisabled }),
        option: ({ isFocused, isMulti, isSelected }) =>
          classNames('select__option', { isFocused, isMulti, isSelected }),
        placeholder: () => `select__placeholder`,
        singleValue: () => 'select__singleValue',
        valueContainer: () => 'select__valueContainer',
      }}
      closeMenuOnSelect={!isMulti}
      components={components}
      hideSelectedOptions={false}
      isClearable={isClearable}
      isDisabled={disabled}
      isMulti={isMulti}
      isSearchable
      menuPlacement="auto"
      menuPosition="fixed"
      onChange={onChange}
      options={augmentedOptions}
      placeholder={placeholder ?? ''}
      value={value}
    />
  )
}

Select.defaultProps = {
  // eslint-disable-next-line react/default-props-match-prop-types
  isClearable: true,
}

export default Select
