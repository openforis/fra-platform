import React from 'react'

import AvatarField from 'client/components/Form/FormFields/AvatarField'
import CheckboxField from 'client/components/Form/FormFields/CheckboxField'
import CountryField from 'client/components/Form/FormFields/CountryField'
import HiddenField from 'client/components/Form/FormFields/HiddenField'
import LanguageField from 'client/components/Form/FormFields/LanguageField'
import PasswordField from 'client/components/Form/FormFields/PasswordField'
import PermissionsField from 'client/components/Form/FormFields/PermissionsField'
import SelectField from 'client/components/Form/FormFields/SelectField'
import TelephoneField from 'client/components/Form/FormFields/TelephoneField'
import TextField from 'client/components/Form/FormFields/TextField'
import TextLinkField from 'client/components/Form/FormFields/TextLinkField'
import { FieldProps } from 'client/components/Form/FormFields/types'
import UserRoleField from 'client/components/Form/FormFields/UserRoleField'
import { FormFieldType } from 'client/components/Form/types'

export const FormFields: Record<FormFieldType, React.FC<FieldProps>> = {
  [FormFieldType.avatar]: AvatarField,
  [FormFieldType.checkbox]: CheckboxField,
  [FormFieldType.country]: CountryField,
  [FormFieldType.hidden]: HiddenField,
  [FormFieldType.language]: LanguageField,
  [FormFieldType.password]: PasswordField,
  [FormFieldType.permissions]: PermissionsField,
  [FormFieldType.select]: SelectField,
  [FormFieldType.telephone]: TelephoneField,
  [FormFieldType.text]: TextField,
  [FormFieldType.textLink]: TextLinkField,
  [FormFieldType.userRole]: UserRoleField,
}
