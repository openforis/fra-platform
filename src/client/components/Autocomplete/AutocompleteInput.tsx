import React from 'react'

import { GetPropsCommonOptions, UseComboboxGetInputPropsOptions } from 'downshift'

import Icon from '@client/components/Icon'

type Props = {
  getInputProps: (options?: UseComboboxGetInputPropsOptions, otherOptions?: GetPropsCommonOptions) => any
  value: string
  disabled: boolean
  isOpen: boolean
  openMenu: () => void
  readOnlyOptions?: boolean
}
const AutocompleteInput: React.FC<Props> = (props: Props) => {
  const { getInputProps, value, disabled, isOpen, readOnlyOptions, openMenu } = props

  const _onFocus = () => {
    if (readOnlyOptions) openMenu()
  }

  const showArrow = readOnlyOptions && !disabled

  return (
    <div className="autocomplete-input__wrapper">
      <input
        type="text"
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...getInputProps({
          onFocus: _onFocus,
          value,
          disabled,
          className: 'text-input__input-field',
        })}
      />
      {showArrow && <Icon name={isOpen ? 'small-up' : 'small-down'} />}
    </div>
  )
}

AutocompleteInput.defaultProps = {
  readOnlyOptions: false,
}

export default AutocompleteInput
