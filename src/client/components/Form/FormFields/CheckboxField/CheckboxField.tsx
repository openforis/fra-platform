import React from 'react'
import { Controller } from 'react-hook-form'

import ButtonCheckbox from 'client/components/Buttons/ButtonCheckbox'
import FormField from 'client/components/Form/FormFields/FormField'

import { FieldProps } from '../types'

const CheckboxField = (props: FieldProps) => {
  const { control, fieldDefinition } = props

  const { defaultValue, name } = fieldDefinition

  return (
    <FormField
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      noBorder
      renderInput={({ disabled }) => {
        return (
          <Controller
            control={control}
            defaultValue={defaultValue}
            disabled={disabled}
            name={name}
            render={({ field: { onChange, value } }) => (
              <ButtonCheckbox checked={value === true} disabled={disabled} onClick={() => onChange(!value)} />
            )}
          />
        )
      }}
    />
  )
}

export default CheckboxField
