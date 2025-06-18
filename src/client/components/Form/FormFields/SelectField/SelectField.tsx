import React from 'react'

import Select from 'client/components/Inputs/Select'

import { FieldProps } from '../types'

const SelectField = (props: FieldProps) => {
  const { fieldDefinition, setValue, watch } = props

  const { name, options, placeholder } = fieldDefinition

  return (
    <Select
      isClearable={false}
      onChange={(value) => setValue(name, value as string)}
      options={options}
      placeholder={placeholder}
      value={watch(name) as string}
    />
  )
}

export default SelectField
