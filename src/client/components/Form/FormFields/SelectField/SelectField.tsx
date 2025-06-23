import React from 'react'
import { Controller } from 'react-hook-form'

import FormField from 'client/components/Form/FormFields/FormField'
import Select from 'client/components/Inputs/Select'

import { FieldProps } from '../types'

const SelectField = (props: FieldProps) => {
  const { control, fieldDefinition } = props

  const { defaultValue, name, options, placeholder } = fieldDefinition

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <FormField {...props}>
      <Controller
        control={control}
        defaultValue={defaultValue}
        name={name}
        render={({ field: { onChange, value } }) => (
          <Select
            isClearable={false}
            onChange={onChange}
            options={options}
            placeholder={placeholder}
            value={value as string}
          />
        )}
      />
    </FormField>
  )
}

export default SelectField
