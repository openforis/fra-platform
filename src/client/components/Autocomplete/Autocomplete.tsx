import './Autocomplete.scss'
import React from 'react'

import axios from 'axios'
import Turnstone from 'turnstone'

type Props = {
  // styles: Record of autocomplete class names
  styles?: Record<string, string>
  // listbox: Object containing autocomplete options,
  // mainly used for selecting correct key for displayName for object
  listbox: Record<string, unknown>
  // url: Should support query, limit params
  url: string
  disabled: boolean

  value: string
  name?: string
  onChange: (value: any) => void
}

const Autocomplete = (props: Props) => {
  const { value, disabled, onChange, listbox, url, styles, name } = props

  if (disabled) return <div className="text-input__readonly-view ">{value}</div>

  // Set up listbox contents.
  const defaultListbox = {
    // should return array with { [listbox.displayField]: value }
    data: (query: string) => axios.get(`${url}?query=${encodeURIComponent(query)}&limit=10`).then(({ data }) => data),
  }

  const defaultStyles = {
    item: 'autocomplete__item',
    listbox: 'autocomplete__listbox',
    input: 'text-input__input-field',
    ...styles,
  }

  return (
    <div className={name}>
      <Turnstone
        onChange={onChange}
        disabled={disabled}
        text={value}
        onSelect={onChange}
        styles={{
          ...defaultStyles,
          ...styles,
        }}
        id={name}
        listbox={{
          ...defaultListbox,
          ...listbox,
        }}
        typeahead={false}
      />
    </div>
  )
}

Autocomplete.defaultProps = {
  styles: {},
  name: 'autocomplete',
}

export default Autocomplete
