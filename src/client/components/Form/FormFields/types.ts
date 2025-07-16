import {
  Control,
  FieldError,
  FieldErrorsImpl,
  FieldValue,
  Merge,
  UseFormRegister,
  UseFormSetValue,
  UseFormStateReturn,
  UseFormTrigger,
  UseFormWatch,
} from 'react-hook-form'

import { ZodTypeAny } from 'zod'

import { FieldDefinition } from 'client/components/Form/types'

export type FieldProps<
  FIELD_VALUES extends Record<string, unknown> = Record<string, unknown>,
  FIELD_VALUE = unknown
> = {
  control: Control<FIELD_VALUES>
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<FIELD_VALUES>>
  fieldDefinition: FieldDefinition
  fieldValidationSchema?: ZodTypeAny
  formState: UseFormStateReturn<FIELD_VALUES>
  fullWidth?: boolean
  noBorder?: boolean
  register?: UseFormRegister<FIELD_VALUES>
  setValue: UseFormSetValue<FIELD_VALUES>
  trigger: UseFormTrigger<FIELD_VALUES>
  value: FieldValue<FIELD_VALUE>
  watch: UseFormWatch<FIELD_VALUES>
}
