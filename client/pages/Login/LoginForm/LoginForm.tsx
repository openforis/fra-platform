import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { Urls } from '@client/utils'
import { useTranslation } from 'react-i18next'
import { Objects } from '@core/utils'
import { BasePaths } from '@client/basePaths'
import { ApiEndPoint } from '@common/api/endpoint'
import { useAppDispatch } from '@client/store'
import { LoginActions } from '@client/store/login'
import { LoginValidator } from '@client/pages/Login/utils/LoginValidator'

const LoginForm: React.FC = () => {
  const { i18n } = useTranslation()
  const dispatch = useAppDispatch()
  const invitation = Urls.getRequestParam('invitation')
  const isInvitation = !Objects.isEmpty(invitation)

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  // TODO:
  // Handle invitation (=> get invited user details (email))
  const [password2, setPassword2] = useState<string>('')

  const onCancel = window.history.back
  const onLogin = () => {
    const fieldErrors = LoginValidator.localValidate(email, password)
    setErrors(fieldErrors)

    if (!fieldErrors.password && !fieldErrors.password) {
      dispatch(
        LoginActions.localLogin({
          email,
          password,
        })
      )
    }
  }

  return (
    <div className="login__form">
      <h3>{i18n.t('login.signInFRA')}</h3>
      <input
        onFocus={() => setErrors({ ...errors, email: null })}
        value={email || ''}
        disabled={isInvitation}
        type="text"
        placeholder={i18n.t('login.email')}
        onChange={(event) => setEmail(event.target.value)}
      />
      {errors.email && <span className="login__field-error">{i18n.t(errors.email)}</span>}

      <input
        onFocus={() => setErrors({ ...errors, password: null })}
        value={password}
        type="password"
        placeholder={i18n.t('login.password')}
        onChange={(event) => setPassword(event.target.value)}
      />
      {errors.password && <span className="login__field-error">{i18n.t(errors.password)}</span>}

      {invitation && (
        <>
          <input
            onFocus={() => setErrors({ ...errors, password2: null })}
            value={password2}
            type="password"
            placeholder={i18n.t('login.repeatPassword')}
            onChange={(event) => setPassword2(event.target.value)}
          />
          {errors.password2 && <span className="login__field-error">{errors.password2}</span>}
        </>
      )}

      <div>
        <button type="button" className="btn" onClick={onCancel}>
          {i18n.t('login.cancel')}
        </button>

        <button type="button" className="btn" onClick={onLogin}>
          {i18n.t('login.login')}
        </button>
      </div>

      <Link to={BasePaths.Login.resetPassword()} type="button" className="btn-forgot-pwd" onClick={console.log}>
        {i18n.t('login.forgotPassword')}
      </Link>

      <hr className="divider" />

      <a className="btn" href={`${ApiEndPoint.Auth.Login.google()}${invitation ? `?i=${invitation}` : ''}`}>
        {i18n.t('login.signInGoogle')}
      </a>
    </div>
  )
}

export default LoginForm
