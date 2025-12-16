import React from 'react'

import { ApiEndPoint } from 'meta/api/endpoint'

import Form from 'client/components/Form'

import { useFormDefinition } from './hooks/useFormDefinition'
import { useOnSuccess } from './hooks/useOnSuccess'
import { useValidationSchema } from './hooks/useValidationSchema'

const FormLogin: React.FC = () => {
  const formDefinition = useFormDefinition()
  const validationSchema = useValidationSchema()
  const onSuccess = useOnSuccess()

  return (
    <div className="login-form">
      <Form
        action={ApiEndPoint.Auth.login()}
        formDefinition={formDefinition}
        hideCancel
        method="post"
        onSuccess={onSuccess}
        validationSchema={validationSchema}
      />
    </div>
  )
}

export default FormLogin
