import React from 'react'
import { Controller } from 'react-hook-form'

import ButtonCheckbox from 'client/components/Buttons/ButtonCheckbox'
import FormField from 'client/components/Form/FormFields/FormField'
import { useIsFieldDisabled } from 'client/components/Form/FormFields/hooks/useIsFieldDisabled'

import { FieldProps } from '../types'

const CheckboxField = (props: FieldProps) => {
  const { control, fieldDefinition } = props

  const { defaultValue, name } = fieldDefinition
  const disabled = useIsFieldDisabled(props)

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <FormField disabled={disabled} noBorder {...props}>
      <Controller
        control={control}
        defaultValue={defaultValue}
        disabled={disabled}
        name={name}
        render={({ field: { onChange, value } }) => (
          <ButtonCheckbox checked={value === true} disabled={disabled} onClick={() => onChange(!value)} />
        )}
      />
    </FormField>
  )
}

export default CheckboxField
