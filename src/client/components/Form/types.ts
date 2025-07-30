import type { FieldValues, FormProps as ReactHookFormProps } from 'react-hook-form'

import { ZodObject, ZodRawShape } from 'zod'

import { Option } from 'client/components/Inputs/Select'

export enum FormFieldType {
  avatar = 'avatar',
  checkbox = 'checkbox',
  country = 'country',
  hidden = 'hidden',
  language = 'language',
  permissions = 'permissions',
  select = 'select',
  text = 'text',
  textLink = 'textLink',
  userRole = 'userRole',
}

export type WatchCallback<FIELD_VALUES = FieldValues, RETURNED = unknown> = (props: {
  values: FIELD_VALUES
}) => RETURNED

export type FieldDefinition<FIELD_VALUES = FieldValues> = {
  defaultValue?: unknown
  errorField?: string
  isMulti?: boolean
  label: string
  name: string
  options?: Array<Option>
  placeholder?: string
  shouldShow?: (watchValues: FIELD_VALUES) => boolean
  type: FormFieldType
  watches?: {
    clearIf?: WatchCallback<FIELD_VALUES, { shouldClear: boolean; clearValue: unknown }>
    getDisabledOptions?: WatchCallback<FIELD_VALUES, Array<string>>
    isDisabled?: WatchCallback<FIELD_VALUES, boolean>
    resetIf?: WatchCallback<FIELD_VALUES, boolean>
    triggerFields?: Array<string>
  }
}

export type FormDefinition<FIELD_VALUES = FieldValues> = {
  fields: Array<FieldDefinition<FIELD_VALUES>>
}

export type FormValidationSchema = ZodObject<ZodRawShape>

export type FormProps<FIELD_VALUES = FieldValues> = {
  action: ReactHookFormProps<unknown>['action']
  disabled?: boolean
  formDefinition: FormDefinition<FIELD_VALUES>
  hideCancel?: boolean
  method: ReactHookFormProps<unknown>['method']
  onCancel: () => void
  onSuccess?: (values: FIELD_VALUES) => void
  validationSchema?: FormValidationSchema
}
