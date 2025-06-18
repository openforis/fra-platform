import React from 'react'

import InputText from 'client/components/Inputs/InputText'

import { FieldProps } from '../types'

const TextField = (props: FieldProps) => {
  const { fieldDefinition, register } = props

  const { name, placeholder } = fieldDefinition

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <InputText id={name} name={name} placeholder={placeholder} {...register(name)} />
  )
}

export default TextField
