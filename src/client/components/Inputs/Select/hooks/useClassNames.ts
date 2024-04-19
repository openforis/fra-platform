import { useMemo } from 'react'
import { Props as ReactSelectProps } from 'react-select'

import classNames from 'classnames'

import { SelectProps } from 'client/components/Inputs/Select/types'

type Returned = ReactSelectProps['classNames']

export const useClassNames = (props: SelectProps): Returned => {
  const { classNames: classes } = props

  return useMemo<Returned>(() => {
    return {
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
      option: ({ isFocused, isMulti, isSelected }) => classNames('select__option', { isFocused, isMulti, isSelected }),
      placeholder: () => `select__placeholder`,
      singleValue: () => 'select__singleValue',
      valueContainer: () => 'select__valueContainer',
    }
  }, [classes?.container])
}
