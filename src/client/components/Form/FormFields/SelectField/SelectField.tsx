import React, { ReactElement } from 'react'
import { Controller } from 'react-hook-form'

import FormField from 'client/components/Form/FormFields/FormField'
import Select from 'client/components/Inputs/Select'

import { FieldProps } from '../types'

const SelectField: React.FC<FieldProps> = (props) => {
  const { control, fieldDefinition } = props

  const { defaultValue, name, options, placeholder } = fieldDefinition

  return (
    <FormField
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      renderInput={({ disabled }) => {
        return (
          <Controller
            control={control}
            defaultValue={defaultValue}
            disabled={disabled}
            name={name}
            render={({ field: { onChange, value } }): ReactElement => (
              <Select
                disabled={disabled}
                id={name}
                isClearable={false}
                onChange={onChange}
                options={options}
                placeholder={placeholder}
                value={value as string}
              />
            )}
          />
        )
      }}
    />
  )
}

export default SelectField
