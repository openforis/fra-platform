import type { FieldValues, FormProps as ReactHookFormProps } from 'react-hook-form'

import { z } from 'zod'

import { Option } from 'client/components/Inputs/Select'

export enum FormFieldType {
  avatar = 'avatar',
  hidden = 'hidden',
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

export type FormProps<FIELD_VALUES = FieldValues> = {
  action: ReactHookFormProps<unknown>['action']
  formDefinition: FormDefinition
  method: ReactHookFormProps<unknown>['method']
  onCancel: () => void
  onSuccess?: (values: FIELD_VALUES) => void
}
