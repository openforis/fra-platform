import type { FieldValues, FormProps as ReactHookFormProps } from 'react-hook-form'

import { ZodObject, ZodRawShape } from 'zod'

import { Option } from 'client/components/Inputs/Select'

export enum FormFieldType {
  avatar = 'avatar',
  country = 'country',
  hidden = 'hidden',
  language = 'language',
  permissions = 'permissions',
  select = 'select',
  text = 'text',
  userRole = 'userRole',
}

export type FieldDefinition = {
  defaultValue?: unknown
  isDisabled?: (values: FieldValues) => boolean
  label: string
  name: string
  options?: Array<Option>
  placeholder?: string
  shouldShow?: (watchValues: Record<string, unknown>) => boolean
  type: FormFieldType
}

export type FormDefinition = {
  fields: Array<FieldDefinition>
}

export type FormValidationSchema = ZodObject<ZodRawShape>

export type FormProps<FIELD_VALUES = FieldValues> = {
  action: ReactHookFormProps<unknown>['action']
  formDefinition: FormDefinition
  method: ReactHookFormProps<unknown>['method']
  onCancel: () => void
  onSuccess?: (values: FIELD_VALUES) => void
  validationSchema?: FormValidationSchema
}
