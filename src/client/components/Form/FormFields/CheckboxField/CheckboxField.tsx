import React, { ReactElement } from 'react'
import { Controller } from 'react-hook-form'

import ButtonCheckbox, { ButtonCheckboxVariant } from 'client/components/Buttons/ButtonCheckbox'
import FormField from 'client/components/Form/FormFields/FormField'

import { FieldProps } from '../types'

const CheckboxField: React.FC<FieldProps> = (props) => {
  const { control, fieldDefinition } = props

  const { defaultValue, name } = fieldDefinition

  return (
    <FormField
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      noBorder
      renderInput={({ disabled }): ReactElement => {
        return (
          <Controller
            control={control}
            defaultValue={defaultValue}
            disabled={disabled}
            name={name}
            render={({ field: { onChange, value } }): ReactElement => (
              <ButtonCheckbox
                checked={value === true}
                disabled={disabled}
                onClick={(): void => onChange(!value)}
                variant={ButtonCheckboxVariant.form}
              />
            )}
          />
        )
      }}
    />
  )
}

export default CheckboxField
