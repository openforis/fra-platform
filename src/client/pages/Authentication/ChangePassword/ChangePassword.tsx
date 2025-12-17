import React from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router'

import { ApiEndPoint } from 'meta/api/endpoint'

import FormLogin from 'client/pages/Authentication/FormLogin'

import { useData } from './hooks/useData'
import { useOnSuccess } from './hooks/useOnSuccess'
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
        action={ApiEndPoint.Auth.changePassword()}
        disableEmail
        email={data?.user.email}
        hideCancel={false}
        loading={!data}
        onSuccess={onSuccess}
        password2
        resetPasswordUuid={resetPasswordUuid}
      />
    </div>
  )
}

export default ChangePassword
