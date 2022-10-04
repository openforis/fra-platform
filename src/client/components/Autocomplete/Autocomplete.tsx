import './Autocomplete.scss'
import React from 'react'

import Turnstone from 'turnstone'

type Props = {
  // listbox: Object containing autocomplete options,
  // mainly used for selecting correct key for displayName for object
  listbox: Record<string, unknown>
  disabled: boolean

  value: string
  name?: string
  onChange: (value: string | any) => void
  maxItems?: number
}

const Autocomplete: React.FC<Props> = (props: Props) => {
  const { value, disabled, onChange, listbox, name, maxItems } = props

  if (disabled) return <div className="text-input__readonly-view ">{value}</div>

  const defaultStyles = {
    item: 'autocomplete__item',
    listbox: 'autocomplete__listbox',
    input: 'text-input__input-field',
  }

  return (
    <div className={name}>
      <Turnstone
        maxItems={maxItems}
        onChange={onChange}
        disabled={disabled}
        text={value}
        onSelect={onChange}
        styles={{
          ...defaultStyles,
        }}
        id={name}
        listbox={listbox}
        typeahead={false}
      />
    </div>
  )
}

Autocomplete.defaultProps = {
  name: 'autocomplete',
  maxItems: 15,
}

export default Autocomplete
