import './Autocomplete.scss'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'
import { useCombobox, UseComboboxStateChange } from 'downshift'
import { Objects } from 'utils/objects'

import AutocompleteInput from 'client/components/Autocomplete/AutocompleteInput'

type Option = {
  label: string
  value: string
}

type Props = {
  items: Array<Option>
  onSave: (value: string | any) => void
  onPaste?: React.ClipboardEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  value: string
  readOnlyOptions?: boolean

  disabled?: boolean
  name?: string
  onInputValueChange?: (inputValue: string) => void
}

const AutocompleteItem = (props: { item: Option; inputValue: string }) => {
  const { item, inputValue } = props
  const input = item.label
  const regExp = new RegExp(inputValue, 'gi')
  const output = input.replace(regExp, '<b>$&</b>')
  return <span dangerouslySetInnerHTML={{ __html: output }} />
}

const Autocomplete: React.FC<Props> = (props: Props) => {
  const { value, items, disabled, name, onInputValueChange, onPaste, onSave, readOnlyOptions } = props
  const [selectedItem, setSelectedItem] = useState<string>(null)
  const [inputValue, setInputValue] = useState(value)
  const { t } = useTranslation()

  useEffect(() => {
    setInputValue(value)
  }, [value])

  // Handle saving on input field blur or item selected
  const _onStateChange: (changes: UseComboboxStateChange<any>) => void = (changes) => {
    if (changes.type === useCombobox.stateChangeTypes.ItemClick) {
      // Disable saving if selected item is not changed when free text disabled
      if (readOnlyOptions && !changes.selectedItem) {
        return
      }

      // When readOnlyOptions is true, save only selected item from list
      if (readOnlyOptions) {
        onSave(changes.selectedItem ?? '')
        return
      }

      // Default behavior: Save both selected value OR input value
      onSave(changes.selectedItem?.value ?? inputValue)
    } else if (changes.type === useCombobox.stateChangeTypes.InputBlur) {
      const value = items.find(({ label }) => label === inputValue)?.value ?? ''
      if (value === '') setInputValue('')
      onSave({ value })
    }
  }

  const { isOpen, getMenuProps, getInputProps, getComboboxProps, highlightedIndex, getItemProps, openMenu } = useCombobox({
    onInputValueChange(changes) {
      setInputValue(changes.inputValue)
      onInputValueChange?.(changes.inputValue)
    },
    items,
    itemToString(item) {
      return t(item?.label ?? '')
    },
    selectedItem,
    onSelectedItemChange: ({ inputValue, selectedItem: newSelectedItem }) => {
      setInputValue(inputValue)
      setSelectedItem(newSelectedItem)
    },
    onStateChange: _onStateChange,
  })

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <div {...getComboboxProps()} className={classNames('autocomplete', { [name]: name })}>
      <AutocompleteInput
        readOnlyOptions={readOnlyOptions}
        openMenu={openMenu}
        disabled={disabled}
        value={inputValue}
        onPaste={onPaste}
        getInputProps={getInputProps}
      />
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <div className="autocomplete-dropdown" {...getMenuProps()}>
        {isOpen &&
          items.map((item, index) => {
            return (
              <div
                className={classNames('autocomplete-item', {
                  highlighted: highlightedIndex === index,
                  selected: Objects.isEqual(selectedItem, item),
                })}
                // eslint-disable-next-line react/no-array-index-key
                key={`${item.value}_autocomplete_item_${index}`}
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...getItemProps({ item, index })}
              >
                <AutocompleteItem inputValue={inputValue} item={item} />
              </div>
            )
          })}
      </div>
    </div>
  )
}

Autocomplete.defaultProps = {
  name: undefined,
  disabled: false,
  onInputValueChange: undefined,
  onPaste: null,
  readOnlyOptions: false,
}

export default Autocomplete
