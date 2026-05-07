import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'

import { ApiEndPoint } from 'meta/api/endpoint'
import { LoginQueryParams } from 'meta/routes/queryParams/login'
import { Routes } from 'meta/routes/routes'

import { useCycleRouteParams } from 'client/hooks/routeParams'
import { useSearchParams } from 'client/hooks/searchParams'
import ButtonGoogle from 'client/pages/Authentication/ButtonGoogle'
import Divider from 'client/pages/Authentication/Divider'
import FormLogin from 'client/pages/Authentication/FormLogin'
import { useOnSuccess } from 'client/pages/Authentication/FormLogin/hooks/useOnSuccess'
import PrivacyNotice from 'client/pages/Authentication/Invitation/PrivacyNotice'
import Register from 'client/pages/Authentication/Invitation/Register'

const Login: React.FC = () => {
  const { t } = useTranslation()

  const { assessmentName, cycleName } = useCycleRouteParams()
  const { invitationUuid } = useSearchParams<LoginQueryParams>()
  const onSuccess = useOnSuccess()

  if (invitationUuid) {
    return (
      <div className="login-form">
        <Register />
        <PrivacyNotice />
      </div>
    )
  }

  return (
    <div className="login-form">
      <FormLogin action={ApiEndPoint.Auth.login()} labels={{ submit: t('login.signInFRA') }} onSuccess={onSuccess} />
      <Link
        className="btn-help"
        to={Routes.LoginResetPassword.generatePath({ assessmentName, cycleName })}
        type="button"
      >
        {t('login.forgotPassword')}
      </Link>
      <Divider />
      <ButtonGoogle />
    </div>
  )
}

export default Login
