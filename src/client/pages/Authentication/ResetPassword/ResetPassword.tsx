import React from 'react'
import { useTranslation } from 'react-i18next'

import { ApiEndPoint } from 'meta/api/endpoint'

import FormLogin from 'client/pages/Authentication/FormLogin'

import { useOnSuccess } from './hooks/useOnSuccess'

const ResetPassword: React.FC = () => {
  const { t } = useTranslation()

  const onSuccess = useOnSuccess()

  return (
    <div className="login-form">
      <h3>{t('login.forgotPasswordTitle')}</h3>
      <FormLogin
        action={ApiEndPoint.Auth.resetPassword()}
        hideCancel={false}
        labels={{ submit: t('login.resetPassword') }}
        onSuccess={onSuccess}
        password={false}
      />
    </div>
  )
}

export default ResetPassword
