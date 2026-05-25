import React, { ReactElement } from 'react'
import { Controller } from 'react-hook-form'

import { Objects } from 'utils/objects'

import { EditorWYSIWYGLinks } from 'client/components/EditorWYSIWYG'
import FormField from 'client/components/Form/FormFields/FormField'

import { FieldProps } from '../types'

const TextLinkField: React.FC<FieldProps> = (props) => {
  const { control, error, fieldDefinition } = props

  const { defaultValue, name } = fieldDefinition
  const validationErrors = !Objects.isEmpty(error?.message) ? [error.message as string] : undefined

  return (
    <FormField
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      renderInput={({ disabled }): ReactElement => {
        return (
          <Controller
            control={control}
            defaultValue={defaultValue}
            disabled={disabled}
            name={name}
            render={({ field: { onChange, value } }): ReactElement => (
              <EditorWYSIWYGLinks
                disabled={disabled}
                id={name}
                onChange={onChange}
                validationErrors={validationErrors}
                value={value as string}
              />
            )}
          />
        )
      }}
    />
  )
}

export default TextLinkField
