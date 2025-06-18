import { useMemo } from 'react'

import { z, ZodObject, ZodRawShape } from 'zod'

import { FormProps } from 'client/components/Form/types'

export type FormValidationSchema = ZodObject<ZodRawShape>

export const useFormValidationSchema = (props: Pick<FormProps, 'formDefinition'>): FormValidationSchema => {
  const { formDefinition } = props
  const { fields } = formDefinition

  return useMemo<FormValidationSchema>(() => {
    const formSchemaObject = fields.reduce((acc, curr) => {
      if (curr.validation) {
        return {
          ...acc,
          [curr.name]: curr.validation,
        }
      }
      return acc
    }, {})

    return z.object(formSchemaObject)
  }, [fields])
}
