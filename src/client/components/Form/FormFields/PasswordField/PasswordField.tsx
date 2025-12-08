import React from 'react'

import TextField from 'client/components/Form/FormFields/TextField'
import { FieldProps } from 'client/components/Form/FormFields/types'

const PasswordField: React.FC<FieldProps> = (props) => {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <TextField inputType="password" {...props} />
  )
}

export default PasswordField
