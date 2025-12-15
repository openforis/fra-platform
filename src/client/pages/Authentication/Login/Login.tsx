import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'

import { Routes } from 'meta/routes/routes'

import ButtonGoogle from 'client/pages/Authentication/ButtonGoogle'
import Divider from 'client/pages/Authentication/Divider'
import FormLogin from 'client/pages/Authentication/FormLogin'

const Login: React.FC = () => {
  const { t } = useTranslation()

  const assessmentName = 'fra'
  const cycleName = '2025'

  return (
    <div className="login-form">
      <FormLogin />
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
