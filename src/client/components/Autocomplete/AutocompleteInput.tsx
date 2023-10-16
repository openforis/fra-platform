import React from 'react'

import classNames from 'classnames'
import { GetPropsCommonOptions, UseComboboxGetInputPropsOptions } from 'downshift'

type Props = {
  disabled: boolean
  getInputProps: (options?: UseComboboxGetInputPropsOptions, otherOptions?: GetPropsCommonOptions) => any
  onPaste?: React.ClipboardEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  openMenu: () => void
  readOnlyOptions?: boolean
  clearInput: () => void
  value: string
}
const AutocompleteInput: React.FC<Props> = (props: Props) => {
  const { getInputProps, value, disabled, readOnlyOptions, openMenu, onPaste, clearInput } = props

  const _onFocus = () => {
    if (readOnlyOptions) openMenu()
  }

  const showArrow = readOnlyOptions && !disabled

  return (
    <div className={classNames('autocomplete-input__wrapper', { arrow: showArrow })}>
      <input
        type="text"
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...getInputProps({
          onFocus: _onFocus,
          value,
          disabled,
          className: 'text-input__input-field',
          onChange: (e) => {
            if (e.target.value === '') {
              clearInput()
            }
          },
        })}
        onPaste={onPaste}
      />
    </div>
  )
}

AutocompleteInput.defaultProps = {
  onPaste: null,
  readOnlyOptions: false,
}

export default AutocompleteInput
