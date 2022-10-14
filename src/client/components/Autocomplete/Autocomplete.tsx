/* eslint-disable react/jsx-props-no-spreading */
// Object spreading used by downshift

import './Autocomplete.scss'
import React, { useEffect, useState } from 'react'

import { Objects } from '@utils/objects'
import classNames from 'classnames'
import { useCombobox, UseComboboxStateChange } from 'downshift'

import TextInput from '@client/components/TextInput'

// Issue importing enum without 'type' from Downshift; use enum for only used types
enum UseComboboxStateChangeTypes {
  InputBlur = '__input_blur__',
  ItemClick = '__item_click__',
}

type Props = {
  value: string
  onInputValueChange: (changes: UseComboboxStateChange<any>) => void
  labelKey: string
  disabled?: boolean
  items: any[]
  name?: string
  onSave: (value: string | any) => void
}

const Autocomplete: React.FC<Props> = (props: Props) => {
  const { value, items, disabled, name, onInputValueChange, labelKey, onSave } = props

  const [selectedItem, setSelectedItem] = useState(null)
  const [inputValue, setInputValue] = useState(value)

  useEffect(() => {
    setInputValue(value)
  }, [value])

  // Handle saving on input field blur or item selected
  const _onStateChange: (changes: UseComboboxStateChange<any>) => void = (changes) => {
    if (
      [UseComboboxStateChangeTypes.InputBlur, UseComboboxStateChangeTypes.ItemClick].includes(
        changes.type as UseComboboxStateChangeTypes
      )
    ) {
      onSave(changes.selectedItem ?? inputValue)
    }
  }

  const { isOpen, getMenuProps, getInputProps, getComboboxProps, highlightedIndex, getItemProps } = useCombobox({
    onInputValueChange(changes) {
      setInputValue(changes.inputValue)
      onInputValueChange(changes)
    },
    items,
    itemToString(item) {
      return item?.[labelKey] ?? item ?? ''
    },
    selectedItem,
    onSelectedItemChange: ({ inputValue, selectedItem: newSelectedItem }) => {
      setInputValue(inputValue)
      setSelectedItem(newSelectedItem)
    },
    onStateChange: _onStateChange,
  })

  return (
    <div {...getComboboxProps()} className={classNames('autocomplete', { [name]: name })}>
      <TextInput
        {...getInputProps({
          value: inputValue,
          disabled,
          className: 'text-input__input-field',
        })}
      />
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
                key={`${item[labelKey] ?? item}${index}`}
                {...getItemProps({ item, index })}
              >
                {item[labelKey] ?? item}
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
}

export default Autocomplete
