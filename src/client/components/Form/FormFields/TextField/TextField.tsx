import React from 'react'

import classNames from 'classnames'

import FormField from 'client/components/Form/FormFields/FormField'
import { useIsFieldDisabled } from 'client/components/Form/FormFields/hooks/useIsFieldDisabled'
import InputText from 'client/components/Inputs/InputText'

import { FieldProps } from '../types'

const TextField = (props: FieldProps) => {
  const { fieldDefinition, register } = props

  const { name, placeholder } = fieldDefinition
  const disabled = useIsFieldDisabled(props)

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <FormField disabled={disabled} {...props}>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      {disabled && <input className={classNames('input-text disabled')} {...register(name, { disabled })} />}

      {!disabled && (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <InputText disabled={disabled} id={name} name={name} placeholder={placeholder} {...register(name)} />
      )}
    </FormField>
  )
}

export default TextField
