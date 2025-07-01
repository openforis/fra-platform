import React from 'react'

import { FieldProps } from '../types'

const HiddenField = (props: FieldProps) => {
  const { fieldDefinition, register } = props
  const { name } = fieldDefinition

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <input type="hidden" {...register(name)} />
}

export default HiddenField
