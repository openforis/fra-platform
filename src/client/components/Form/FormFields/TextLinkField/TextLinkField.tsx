import React from 'react'
import { Controller } from 'react-hook-form'

import { EditorWYSIWYGLinks } from 'client/components/EditorWYSIWYG'
import FormField from 'client/components/Form/FormFields/FormField'

import { FieldProps } from '../types'

const TextLinkField = (props: FieldProps) => {
  const { control, fieldDefinition } = props

  const { defaultValue, name } = fieldDefinition

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
            render={({ field: { onChange, value } }) => (
              <EditorWYSIWYGLinks disabled={disabled} onChange={onChange} value={value as string} />
            )}
          />
        )
      }}
    />
  )
}

export default TextLinkField
