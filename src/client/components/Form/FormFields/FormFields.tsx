import React from 'react'

import { FormType } from '../types'
import PermissionsField from './PermissionsField'
import SelectField from './SelectField'
import TextField from './TextField'
import { FieldProps } from './types'

export const FormFields: Record<FormType, React.FC<FieldProps>> = {
  [FormType.text]: TextField,
  [FormType.select]: SelectField,
  [FormType.permissions]: PermissionsField,
}
