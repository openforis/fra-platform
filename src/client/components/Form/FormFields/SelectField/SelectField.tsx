import React from 'react'

import FormField from 'client/components/Form/FormFields/FormField'
import Select from 'client/components/Inputs/Select'

import { FieldProps } from '../types'

const SelectField = (props: FieldProps) => {
  const { fieldDefinition, setValue, watch } = props

  const { name, options, placeholder } = fieldDefinition

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <FormField {...props}>
      <Select
        isClearable={false}
        onChange={(value) => setValue(name, value as string)}
        options={options}
        placeholder={placeholder}
        value={watch(name) as string}
      />
    </FormField>
  )
}

export default SelectField
