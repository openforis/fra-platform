import React from 'react'

import HiddenField from 'client/components/Form/FormFields/HiddenField'
import LanguageField from 'client/components/Form/FormFields/LanguageField'
import PermissionsField from 'client/components/Form/FormFields/PermissionsField'
import SelectField from 'client/components/Form/FormFields/SelectField'
import TextField from 'client/components/Form/FormFields/TextField'
import { FieldProps } from 'client/components/Form/FormFields/types'
import UserRoleField from 'client/components/Form/FormFields/UserRoleField'
import { FormFieldType } from 'client/components/Form/types'

export const FormFields: Record<FormFieldType, React.FC<FieldProps>> = {
  [FormFieldType.hidden]: HiddenField,
  [FormFieldType.language]: LanguageField,
  [FormFieldType.permissions]: PermissionsField,
  [FormFieldType.select]: SelectField,
  [FormFieldType.text]: TextField,
  [FormFieldType.userRole]: UserRoleField,
}
