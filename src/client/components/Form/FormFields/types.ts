import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form'

export type FieldProps<T extends Record<string, unknown> = Record<string, unknown>> = {
  errors: FieldErrors<T>
  label: string
  name: string
  options?: Array<{ label: string; value: string }>
  placeholder?: string
  register?: UseFormRegister<T>
  required?: boolean
  setValue: UseFormSetValue<T>
  shouldShow?: (watchValues: Record<string, unknown>) => boolean
  watch: UseFormWatch<T>
}
