import './Form.scss'
import React from 'react'
import { Form as ReactHookForm, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { UUIDs } from 'meta/uuid'

import { useAppDispatch } from 'client/store/hooks'
import { NotificationActions } from 'client/store/ui/notification/actions'
import { DataGrid } from 'client/components/DataGrid'
import { FormFields } from 'client/components/Form/FormFields/FormFields'

import { useDefaultValues } from './hooks/useDefaultValues'
import { useFormValidationSchema } from './hooks/useFormValidationSchema'
import Buttons from './Buttons'
import { FormProps } from './types'

const Form: React.FC<FormProps> = (props) => {
  const { action, formDefinition, method, onCancel, onSuccess } = props
  const dispatch = useAppDispatch()

  const { fields } = formDefinition

  const defaultValues = useDefaultValues(fields)

  const formValidationSchema = useFormValidationSchema({ formDefinition })
  // type FormValues = z.infer<typeof formSchema>

  const resolver = zodResolver(formValidationSchema)
  const { control, formState, register, setValue, watch } = useForm({ resolver, defaultValues, shouldUnregister: true })
  const { errors, isSubmitting } = formState
  const watchValues = watch()

  return (
    <ReactHookForm
      action={action}
      control={control}
      method={method}
      onError={async ({ response }) => {
        const { error: message, params } = await response.json()
        dispatch(NotificationActions.addMessage({ id: UUIDs.getUuid(), type: 'error', message, params }))
      }}
      onSuccess={() => onSuccess?.(watchValues)}
    >
      <DataGrid className="form-grid" gridTemplateColumns="min-content 1fr">
        {fields.map((fieldDefinition) => {
          const { name, shouldShow, type } = fieldDefinition
          const Component = FormFields[type]
          const fieldValidationSchema = formValidationSchema.shape[name]

          if (shouldShow && !shouldShow(watchValues)) return null

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
    </ReactHookForm>
  )
}

export default Form
