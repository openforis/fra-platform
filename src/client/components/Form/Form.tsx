import './Form.scss'
import React from 'react'
import { Form as ReactHookForm, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { Objects } from 'utils/objects'
import { z } from 'zod'

import { UUIDs } from 'meta/uuid/uuids'

import { useAppDispatch } from 'client/store/hooks'
import { NotificationActions } from 'client/store/ui/notification/actions'
import { DataGrid } from 'client/components/DataGrid'
import { FormFields } from 'client/components/Form/FormFields/FormFields'

import { useDefaultValues } from './hooks/useDefaultValues'
import { useOnSubmit } from './hooks/useOnSubmit'
import Buttons from './Buttons'
import { FormProps, FormValidationSchema } from './types'

const defaults = {
  validationSchema: z.any(),
}

const getSchemaFieldPath = (schema: FormValidationSchema | z.ZodAny, fieldPath: Array<string>): typeof schema => {
  const schemaPath = fieldPath.flatMap((field) => ['shape', field])
  return Objects.getInPath(schema, schemaPath)
}

const Form: React.FC<FormProps> = (props) => {
  const {
    action,
    disabled,
    formDefinition,
    hideCancel,
    method,
    onCancel,
    onSuccess,
    validationSchema = defaults.validationSchema,
  } = props
  const { fields } = formDefinition

  const dispatch = useAppDispatch()
  // type FormValues = z.infer<typeof formSchema>
  const defaultValues = useDefaultValues(fields)
  const resolver = zodResolver(validationSchema)
  const form = useForm({ resolver, defaultValues, shouldUnregister: true })
  const onSubmit = useOnSubmit(props)

  const { control, formState, register, resetField, setValue, trigger, watch } = form
  const { errors, isDirty, isSubmitting } = formState
  const watchValues = watch()

  return (
    <ReactHookForm
      action={action}
      control={control}
      method={method}
      onError={async ({ response }): Promise<void> => {
        const { error: message, params } = await response.json()
        dispatch(NotificationActions.addMessage({ id: UUIDs.getUuid(), type: 'error', message, params }))
      }}
      onSubmit={onSubmit}
      onSuccess={(): void => onSuccess?.(watchValues)}
    >
      <DataGrid className="form-grid" gridTemplateColumns="max-content 1fr">
        {fields.map((fieldDefinition) => {
          const { errorField, name, shouldShow, type } = fieldDefinition

          if (shouldShow && !shouldShow(watchValues)) return null

          const Component = FormFields[type]
          const path = name.split('.')
          const fieldValidationSchema = getSchemaFieldPath(validationSchema, path)
          const error = Objects.getInPath(errors, errorField ? errorField.split('.') : path)

          return (
            <Component
              key={name}
              control={control}
              error={error}
              fieldDefinition={fieldDefinition}
              fieldValidationSchema={fieldValidationSchema}
              formState={formState}
              register={register}
              resetField={resetField}
              setValue={setValue}
              trigger={trigger}
              watch={watch}
            />
          )
        })}

        <Buttons
          disabled={disabled}
          hideCancel={hideCancel}
          isDirty={isDirty}
          isSubmitting={isSubmitting}
          onCancel={onCancel}
        />
      </DataGrid>
    </ReactHookForm>
  )
}

export default Form
