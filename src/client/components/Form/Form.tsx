import './Form.scss'
import React from 'react'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { DataGrid } from 'client/components/DataGrid'
import { FormFields } from 'client/components/Form/FormFields/FormFields'

import { useDefaultValues } from './hooks/useDefaultValues'
import { useFormValidationSchema } from './hooks/useFormValidationSchema'
import Buttons from './Buttons'
import { FormProps } from './types'

const Form: React.FC<FormProps> = (props) => {
  const { formDefinition, onCancel, onSubmit } = props
  const { fields } = formDefinition

  const defaultValues = useDefaultValues(fields)

  const formValidationSchema = useFormValidationSchema({ formDefinition })
  // type FormValues = z.infer<typeof formSchema>

  const resolver = zodResolver(formValidationSchema)
  const { control, formState, handleSubmit, register, setValue, watch } = useForm({
    resolver,
    defaultValues,
    shouldUnregister: true,
  })
  const { errors, isSubmitting } = formState

  const watchValues = watch()

  const visibleFields = fields.filter((fieldDefinition) => {
    return fieldDefinition.shouldShow?.(watchValues) ?? true
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DataGrid className="form-grid" gridTemplateColumns="min-content 1fr">
        {visibleFields.map((fieldDefinition) => {
          const { name, type } = fieldDefinition
          const Component = FormFields[type]
          const fieldValidationSchema = formValidationSchema.shape[name]

          return (
            <Component
              key={name}
              control={control}
              error={errors[name]}
              fieldDefinition={fieldDefinition}
              fieldValidationSchema={fieldValidationSchema}
              register={register}
              setValue={setValue}
              watch={watch}
            />
          )
        })}

        <Buttons isSubmitting={isSubmitting} onCancel={onCancel} />
      </DataGrid>
    </form>
  )
}

export default Form
