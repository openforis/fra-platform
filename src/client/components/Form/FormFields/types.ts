import {
  Control,
  FieldError,
  FieldErrorsImpl,
  Merge,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form'

import { ZodTypeAny } from 'zod'

import { FieldDefinition } from 'client/components/Form/types'

export type FieldProps<FIELD_VALUES extends Record<string, unknown> = Record<string, unknown>> = {
  control: Control<FIELD_VALUES>
  disabled?: boolean
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<FIELD_VALUES>>
  fieldDefinition: FieldDefinition
  fieldValidationSchema?: ZodTypeAny
  fullWidth?: boolean
  noBorder?: boolean
  register?: UseFormRegister<FIELD_VALUES>
  setValue: UseFormSetValue<FIELD_VALUES>
  watch: UseFormWatch<FIELD_VALUES>
}
