import './Select.scss'
import React from 'react'
import ReactSelect from 'react-select'

import classNames from 'classnames'

import { useOnChange } from './hooks/useOnChange'
import { useToggleAllConfig } from './hooks/useToggleAllConfig'
import { useValue } from './hooks/useValue'
import { SelectProps } from './types'

const Select: React.FC<SelectProps> = (props) => {
  const { classNames: classes, disabled, isClearable, isMulti, options, placeholder, toggleAll } = props

  const value = useValue(props)
  const onChange = useOnChange(props)

  const {
    components,
    hideSelectedOptions,
    options: augmentedOptions,
  } = useToggleAllConfig({ isMulti, options, toggleAll, value })

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
        option: ({ isFocused, isSelected }) => classNames('select__option', { isFocused, isSelected, toggleAll }),
        placeholder: () => `select__placeholder`,
        singleValue: () => 'select__singleValue',
        valueContainer: () => 'select__valueContainer',
      }}
      closeMenuOnSelect={!isMulti}
      components={components}
      hideSelectedOptions={hideSelectedOptions}
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
