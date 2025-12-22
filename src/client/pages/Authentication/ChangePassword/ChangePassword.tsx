import React from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router'

import { ApiEndPoint } from 'meta/api/endpoint'

import FormLogin from 'client/pages/Authentication/FormLogin'
import { useOnSuccess } from 'client/pages/Authentication/FormLogin/hooks/useOnSuccess'

import { useData } from './hooks/useData'
import Expired from './Expired'

const ChangePassword: React.FC = () => {
  const { t } = useTranslation()
  const { resetPasswordUuid } = useParams<{ resetPasswordUuid: string }>()
  const data = useData()
  const onSuccess = useOnSuccess()

  if (data && !data.user?.email) {
    return <Expired />
  }

  return (
    <div className="login-form">
      <h3>{t('login.changePassword')}</h3>
      <FormLogin
        action={ApiEndPoint.Auth.login()}
        disableEmail
        email={data?.user.email}
        loading={!data}
        onSuccess={onSuccess}
        password2
        resetPasswordUuid={resetPasswordUuid}
      />
    </div>
  )
}

export default ChangePassword
