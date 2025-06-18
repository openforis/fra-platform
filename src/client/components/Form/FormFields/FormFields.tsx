import React from 'react'

import { FormFieldType } from '../types'
import PermissionsField from './PermissionsField'
import SelectField from './SelectField'
import TextField from './TextField'
import { FieldProps } from './types'

export const FormFields: Record<FormFieldType, React.FC<FieldProps>> = {
  [FormFieldType.text]: TextField,
  [FormFieldType.select]: SelectField,
  [FormFieldType.permissions]: PermissionsField,
}
