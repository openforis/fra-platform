import React from 'react'

import classNames from 'classnames'

import FormField from 'client/components/Form/FormFields/FormField'
import InputText from 'client/components/Inputs/InputText'

import { FieldProps } from '../types'

const TextField = (props: FieldProps) => {
  const { fieldDefinition, register } = props

  const { name, placeholder } = fieldDefinition

  return (
    <FormField
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      renderInput={({ disabled }) => {
        if (disabled) {
          // eslint-disable-next-line react/jsx-props-no-spreading
          return <input className={classNames('input-text disabled')} {...register(name, { disabled })} />
        }
        return (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <InputText disabled={disabled} id={name} name={name} placeholder={placeholder} {...register(name)} />
        )
      }}
    />
  )
}

export default TextField
