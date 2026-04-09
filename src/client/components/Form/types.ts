import type { FieldValues, FormProps as ReactHookFormProps } from 'react-hook-form'
import { ZodObject, ZodRawShape } from 'zod'

import { Option } from 'client/components/Inputs/Select'

export enum FormFieldType {
  avatar = 'avatar',
  checkbox = 'checkbox',
  country = 'country',
  file = 'file',
  hidden = 'hidden',
  language = 'language',
  password = 'password',
  permissions = 'permissions',
  select = 'select',
  telephone = 'telephone',
  text = 'text',
  textLink = 'textLink',
  userRole = 'userRole',
}

export type WatchCallback<FIELD_VALUES = FieldValues, RETURNED = unknown> = (props: {
  values: FIELD_VALUES
}) => RETURNED

export type FieldDefinition<FIELD_VALUES = FieldValues> = {
  country?: { allowAtlantis?: boolean } // specific country type options
  bordered?: boolean
  defaultValue?: unknown
  errorField?: string
  isMulti?: boolean
  label: string
  name: string
  options?: Array<Option>
  placeholder?: string
  required?: boolean
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

export type FormDefinitionLabels = { submit: string }

export type FormDefinition<FIELD_VALUES = FieldValues> = {
  labels?: FormDefinitionLabels
  fields: Array<FieldDefinition<FIELD_VALUES>>
}

export type FormValidationSchema = ZodObject<ZodRawShape>

export type FormProps<FIELD_VALUES = FieldValues> = {
  action: ReactHookFormProps<unknown>['action']
  disabled?: boolean
  formDefinition: FormDefinition<FIELD_VALUES>
  hideCancel?: boolean
  method?: ReactHookFormProps<unknown>['method']
  onCancel?: () => void
  onSuccess?: (values: FIELD_VALUES, response: Response) => void | Promise<void>
  validationSchema?: FormValidationSchema
}
