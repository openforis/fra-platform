import { UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form'

import { FieldDefinition } from 'client/components/Form/types'

export type FieldProps<T extends Record<string, unknown> = Record<string, unknown>> = {
  fieldDefinition: FieldDefinition
  register?: UseFormRegister<T>
  setValue: UseFormSetValue<T>
  watch: UseFormWatch<T>
}
