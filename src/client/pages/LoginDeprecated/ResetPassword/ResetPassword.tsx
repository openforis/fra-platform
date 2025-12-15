import React from 'react'
import { useTranslation } from 'react-i18next'

import { ApiEndPoint } from 'meta/api/endpoint'

import Form from 'client/components/Form'

import { useFormDefinition } from './hooks/useFormDefinition'
import { useOnCancel } from './hooks/useOnCancel'
import { useOnSuccess } from './hooks/useOnSuccess'
import { useValidationSchema } from './hooks/useValidationSchema'

const ResetPassword: React.FC = () => {
  const { t } = useTranslation()

  const formDefinition = useFormDefinition()
  const validationSchema = useValidationSchema()
  const onSuccess = useOnSuccess()
  const onCancel = useOnCancel()

  return (
    <div className="login-form">
      <h3>{t('login.forgotPasswordTitle')}</h3>
      <Form
        action={ApiEndPoint.Auth.resetPassword()}
        formDefinition={formDefinition}
        method="post"
        onCancel={onCancel}
        onSuccess={onSuccess}
        validationSchema={validationSchema}
      />
    </div>
  )
}

export default ResetPassword
