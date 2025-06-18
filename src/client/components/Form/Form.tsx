import './Form.scss'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { zodResolver } from '@hookform/resolvers/zod'
import { z, ZodOptional } from 'zod'

import { DataGrid } from 'client/components/DataGrid'

import FormFields from './FormFields'
import { FormProps } from './types'

const Form: React.FC<FormProps> = ({ defaultValues, formDefinition, onCancel, onSubmit }) => {
  const { t } = useTranslation()

  const formSchemaObject = formDefinition.reduce((acc, curr) => {
    if (curr.validation) {
      return {
        ...acc,
        [curr.name]: curr.validation,
      }
    }
    return acc
  }, {})

  const formSchema = z.object(formSchemaObject)

  type FormValues = z.infer<typeof formSchema>

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    setValue,
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  const gridTemplateColumns = '0.3fr 1fr'

  return (
    <form onSubmit={handleSubmit(onSubmit as SubmitHandler<FormValues>)}>
      <DataGrid className="form-grid" gridTemplateColumns={gridTemplateColumns}>
        {formDefinition.map((formField) => {
          const Component = FormFields[formField.type]

          const schema = formSchema.shape[formField.name as keyof typeof formSchema.shape] as z.ZodTypeAny
          const isOptional = schema instanceof ZodOptional

          return (
            <Component
              key={formField.name}
              errors={errors}
              label={formField.label}
              name={formField.name}
              options={formField.options}
              placeholder={formField.placeholder}
              register={register}
              required={!isOptional}
              setValue={setValue}
              shouldShow={formField.shouldShow}
              watch={watch}
            />
          )
        })}

        <div className="edit-user__form-item button-container">
          <button className="btn btn-secondary" onClick={onCancel} type="button">
            {t('common.cancel')}
          </button>

          <button className="btn btn-primary" disabled={isSubmitting} type="submit">
            {isSubmitting ? t('common.submitting') : t('common.submit')}
          </button>
        </div>
      </DataGrid>
    </form>
  )
}

export default Form
