import React from 'react'
import classNames from 'classnames'

import FormField from 'client/components/Form/FormFields/FormField'
import InputText from 'client/components/Inputs/InputText'

import { FieldProps } from '../types'

type TextFieldProps = FieldProps & {
  inputType?: 'password' | 'text'
}

const TextField: React.FC<TextFieldProps> = (props) => {
  const { fieldDefinition, inputType = 'text', register } = props

  const { name, placeholder } = fieldDefinition

  return (
    <FormField
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      renderInput={({ disabled }) => {
        if (disabled) {
          return (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <input className={classNames('input-text disabled')} type={inputType} {...register(name, { disabled })} />
          )
        }
        return (
          <InputText
            disabled={disabled}
            id={name}
            name={name}
            placeholder={placeholder}
            type={inputType}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...register(name)}
          />
        )
      }}
    />
  )
}

export default TextField
