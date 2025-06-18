import { z } from 'zod'

export enum FormType {
  'text' = 'text',
  'select' = 'select',
  'permissions' = 'permissions',
}

export type FormDefinition = {
  name: string
  label: string
  validation?: z.ZodTypeAny
  type: FormType
  options?: Array<{ label: string; value: string }>
  placeholder?: string
  shouldShow?: (watchValues: Record<string, unknown>) => boolean
}

export type FormProps = {
  onSubmit: (data: unknown) => void
  onCancel: () => void
  formDefinition: Array<FormDefinition>
  defaultValues: object
}
