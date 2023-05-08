import React from 'react'

import classNames from 'classnames'
import { GetPropsCommonOptions, UseComboboxGetInputPropsOptions } from 'downshift'

type Props = {
  getInputProps: (options?: UseComboboxGetInputPropsOptions, otherOptions?: GetPropsCommonOptions) => any
  value: string
  disabled: boolean
  openMenu: () => void
  onPaste?: React.ClipboardEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  readOnlyOptions?: boolean
}
const AutocompleteInput: React.FC<Props> = (props: Props) => {
  const { getInputProps, value, disabled, readOnlyOptions, openMenu, onPaste } = props

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
