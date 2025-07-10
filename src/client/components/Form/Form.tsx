import './Form.scss'
import React from 'react'
import { Form as ReactHookForm, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { Objects } from 'utils/objects'
import { z } from 'zod'

import { UUIDs } from 'meta/uuid'

import { useAppDispatch } from 'client/store/hooks'
import { NotificationActions } from 'client/store/ui/notification/actions'
import { DataGrid } from 'client/components/DataGrid'
import { FormFields } from 'client/components/Form/FormFields/FormFields'

import { useDefaultValues } from './hooks/useDefaultValues'
import { useOnSubmit } from './hooks/useOnSubmit'
import Buttons from './Buttons'
import { FormProps } from './types'

const defaults = {
  validationSchema: z.any(),
}

const Form: React.FC<FormProps> = (props) => {
  const { action, formDefinition, method, onCancel, onSuccess, validationSchema = defaults.validationSchema } = props
  const dispatch = useAppDispatch()

  const { fields } = formDefinition

  const defaultValues = useDefaultValues(fields)
  const onSubmit = useOnSubmit(props)

  // type FormValues = z.infer<typeof formSchema>
  const resolver = zodResolver(validationSchema)
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
      onSubmit={onSubmit}
      onSuccess={() => onSuccess?.(watchValues)}
    >
      <DataGrid className="form-grid" gridTemplateColumns="max-content 1fr">
        {fields.map((fieldDefinition) => {
          const { name, shouldShow, type } = fieldDefinition

          if (shouldShow && !shouldShow(watchValues)) return null

          const Component = FormFields[type]
          const path = name.split('.')
          const fieldValidationSchema = Objects.getInPath(validationSchema, ['shape', ...path])
          const error = Objects.getInPath(errors, path)

          return (
            <Component
              key={name}
              control={control}
              error={error}
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
