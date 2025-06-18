import { z } from 'zod'

import { Option } from 'client/components/Inputs/Select'

export enum FormFieldType {
  permissions = 'permissions',
  select = 'select',
  text = 'text',
}

export type FieldDefinition = {
  label: string
  name: string
  options?: Array<Option>
  placeholder?: string
  shouldShow?: (watchValues: Record<string, unknown>) => boolean
  type: FormFieldType
  validation?: z.ZodTypeAny
}

export type FormDefinition = {
  fields: Array<FieldDefinition>
}

export type FormProps = {
  defaultValues: object
  formDefinition: FormDefinition
  onCancel: () => void
  onSubmit: (data: unknown) => void
}
