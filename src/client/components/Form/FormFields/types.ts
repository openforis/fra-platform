import { FieldError, FieldErrorsImpl, Merge, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form'

import { ZodTypeAny } from 'zod'

import { FieldDefinition } from 'client/components/Form/types'

export type FieldProps<T extends Record<string, unknown> = Record<string, unknown>> = {
  error?: FieldError | Merge<FieldError, FieldErrorsImpl>
  fieldDefinition: FieldDefinition
  fieldValidationSchema?: ZodTypeAny
  noBorder?: boolean
  register?: UseFormRegister<T>
  setValue: UseFormSetValue<T>
  watch: UseFormWatch<T>
}
