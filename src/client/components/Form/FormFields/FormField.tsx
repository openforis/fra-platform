import React from 'react'
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { Objects } from 'utils/objects'
import { ZodOptional, ZodTypeAny } from 'zod'

import { DataCell, DataRow } from 'client/components/DataGrid'
import { FieldProps } from 'client/components/Form/FormFields/types'
import Icon from 'client/components/Icon'

import { FormFields } from './FormFields'

type Props = FieldProps & {
  error?: FieldError | Merge<FieldError, FieldErrorsImpl>
  fieldValidationSchema?: ZodTypeAny
}

const FormField: React.FC<Props> = (props) => {
  const { error, fieldDefinition, fieldValidationSchema, register, setValue, watch } = props
  const { label, name, type } = fieldDefinition
  const Component = FormFields[type]
  const required = !Objects.isNil(fieldValidationSchema) && !(fieldValidationSchema instanceof ZodOptional)

  const { t } = useTranslation()

  return (
    <DataRow>
      <DataCell className="form-cell-label" noBorder>
        <label htmlFor={name}>
          {t(label)}
          {required && '*'}
        </label>
      </DataCell>

      <DataCell editable lastCol lastRow>
        <Component key={name} fieldDefinition={fieldDefinition} register={register} setValue={setValue} watch={watch} />

        {error && (
          <div className="form-cell-error">
            <Icon name="alert" />
            {error?.message as string}
          </div>
        )}
      </DataCell>
    </DataRow>
  )
}

export default FormField
