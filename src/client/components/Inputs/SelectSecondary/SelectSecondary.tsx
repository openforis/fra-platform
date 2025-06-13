import './SelectSecondary.scss'
import React from 'react'

import Select from 'client/components/Inputs/Select'
import { SelectProps } from 'client/components/Inputs/Select/types'

const SelectSecondary: React.FC<SelectProps> = (props) => {
  const { disabled, isClearable, isMulti, maxMenuHeight, onChange, options, placeholder, value } = props

  return (
    <Select
      classNames={{ container: 'select-secondary__container' }}
      disabled={disabled}
      isClearable={isClearable}
      isMulti={isMulti}
      maxMenuHeight={maxMenuHeight}
      onChange={onChange}
      options={options}
      placeholder={placeholder}
      value={value}
    />
  )
}

export default SelectSecondary
