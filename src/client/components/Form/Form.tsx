import './Form.scss'
import React from 'react'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { DataGrid } from 'client/components/DataGrid'
import { FormFields } from 'client/components/Form/FormFields/FormFields'

import { useFieldReset } from './hooks/useFieldReset'
import { useFormValidationSchema } from './hooks/useFormValidationSchema'
import Buttons from './Buttons'
import { FormProps } from './types'

const Form: React.FC<FormProps> = (props) => {
  const { defaultValues, formDefinition, onCancel, onSubmit } = props
  const { fields } = formDefinition

  const formValidationSchema = useFormValidationSchema({ formDefinition })
  // type FormValues = z.infer<typeof formSchema>

  const resolver = zodResolver(formValidationSchema)
  const { control, formState, handleSubmit, register, setValue, watch } = useForm({ resolver, defaultValues })
  const { errors, isSubmitting } = formState

  const watchValues = watch()

  useFieldReset({ fields, watchValues, setValue, defaultValues })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DataGrid className="form-grid" gridTemplateColumns="min-content 1fr">
        {fields.map((fieldDefinition) => {
          const { name, shouldShow, type } = fieldDefinition
          const Component = FormFields[type]
          const fieldValidationSchema = formValidationSchema.shape[name]

          if (shouldShow && !shouldShow(watchValues)) {
            return null
          }

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
