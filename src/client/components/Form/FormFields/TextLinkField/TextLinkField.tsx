import React from 'react'
import { Controller } from 'react-hook-form'

import { EditorWYSIWYGLinks } from 'client/components/EditorWYSIWYG'
import FormField from 'client/components/Form/FormFields/FormField'
import { useIsFieldDisabled } from 'client/components/Form/FormFields/hooks/useIsFieldDisabled'

import { FieldProps } from '../types'

const TextLinkField = (props: FieldProps) => {
  const { control, fieldDefinition } = props

  const { defaultValue, name } = fieldDefinition
  const disabled = useIsFieldDisabled(props)

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <FormField disabled={disabled} {...props}>
      <Controller
        control={control}
        defaultValue={defaultValue}
        disabled={disabled}
        name={name}
        render={({ field: { onChange, value } }) => (
          <EditorWYSIWYGLinks disabled={disabled} onChange={onChange} value={value as string} />
        )}
      />
    </FormField>
  )
}

export default TextLinkField
