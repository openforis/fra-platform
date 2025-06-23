import { z } from 'zod'

import { Option } from 'client/components/Inputs/Select'

export enum FormFieldType {
  language = 'language',
  permissions = 'permissions',
  select = 'select',
  text = 'text',
  userRole = 'userRole',
}

export type FieldDefinition = {
  defaultValue?: unknown
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
  formDefinition: FormDefinition
  onCancel: () => void
  onSubmit: (data: unknown) => void
}
