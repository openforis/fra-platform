import './CountryField.scss'
import React from 'react'
import { Controller } from 'react-hook-form'

import CountryMultiSelect from 'client/components/CountryMultiSelect'
import FormField from 'client/components/Form/FormFields/FormField'
import { useIsFieldDisabled } from 'client/components/Form/FormFields/hooks/useIsFieldDisabled'

import { FieldProps } from '../types'

const CountryField = (props: FieldProps) => {
  const { control, fieldDefinition } = props

  const { defaultValue, isMulti = false, name, placeholder } = fieldDefinition
  const disabled = useIsFieldDisabled(props)

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <FormField classes={{ cellField: 'form-cell-field_country' }} disabled={disabled} {...props}>
      <Controller
        control={control}
        defaultValue={defaultValue}
        disabled={disabled}
        name={name}
        render={({ field }) => {
          const { onChange, value } = field

          return (
            <CountryMultiSelect
              disabled={disabled}
              isClearable={false}
              isMulti={isMulti}
              onChange={onChange}
              placeholder={placeholder}
              value={value as string | Array<string>}
            />
          )
        }}
      />
    </FormField>
  )
}

export default CountryField
