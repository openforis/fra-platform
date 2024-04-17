import './MultiSelectOption.scss'
import React, { useEffect, useRef } from 'react'
import { components, OptionProps } from 'react-select'

import { Option } from 'client/components/Inputs/Select'

import { useMultiSelectOptionConfig } from './hooks/useMultiSelectOptionConfig'

export const MultiSelectOption: React.FC<OptionProps<Option>> = (props) => {
  const { data, label } = props

  const { checked, isInputIndeterminate } = useMultiSelectOptionConfig(props)

  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = isInputIndeterminate
    }
  }, [isInputIndeterminate])

  return (
    //  eslint-disable-next-line react/jsx-props-no-spreading
    <components.Option {...props}>
      <input
        key={`${data.value}-${isInputIndeterminate}`}
        ref={inputRef}
        checked={checked}
        className="select__toggleAllOption-checkbox"
        onChange={() => undefined}
        type="checkbox"
      />
      <span className="select__toggleAllOption-label">{label}</span>
    </components.Option>
  )
}

export default MultiSelectOption
