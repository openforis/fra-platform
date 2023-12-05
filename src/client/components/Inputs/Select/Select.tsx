import './Select.scss'
import React from 'react'
import RSelect, { Props as PropsReactSelect } from 'react-select'

import classNames from 'classnames'

import { ClearIndicator, DropdownIndicator, IndicatorsContainer } from 'client/components/Inputs/Select/Indicators'

import { Option, OptionsOrGroups } from './types'

type Props = Pick<PropsReactSelect, 'onChange'> & {
  disabled?: boolean
  options: OptionsOrGroups
  placeholder?: string
  value?: Option
}

const Select: React.FC<Props> = (props) => {
  const { disabled, onChange, options, placeholder, value } = props

  return (
    <RSelect
      classNames={{
        container: () => classNames('select__container'),
        control: ({ isDisabled, isFocused }) => classNames('select__control', { isDisabled, isFocused }),
        group: () => 'select__group',
        groupHeading: () => 'select__groupHeading',
        input: () => 'select__input',
        menu: () => classNames('select__menu'),
        menuList: () => classNames('select__menuList'),
        option: ({ isFocused, isSelected }) => classNames('select__option', { isFocused, isSelected }),
        singleValue: () => 'select__singleValue',
        valueContainer: () => 'select__valueContainer',
      }}
      components={{ ClearIndicator, DropdownIndicator, IndicatorsContainer, IndicatorSeparator: null }}
      isClearable
      isDisabled={disabled}
      isSearchable
      onChange={onChange}
      options={options}
      placeholder={placeholder}
      value={value}
    />
  )
}

Select.defaultProps = {
  disabled: false,
  placeholder: '',
  value: undefined,
}

export default Select
