import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'

import { Objects } from 'utils/index'

import { ApiEndPoint } from 'meta/api/endpoint'
import { ClientRoutes } from 'meta/app'

import { useAppDispatch } from 'client/store'
import { useAssessment, useCycle } from 'client/store/assessment'
import { LoginActions } from 'client/store/login'
import { useUser } from 'client/store/user'
import { useToaster } from 'client/hooks/useToaster'
import { isError, LoginValidator } from 'client/pages/Login/utils/LoginValidator'
import { Urls } from 'client/utils/urls'

const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const assessment = useAssessment()
  const cycle = useCycle()
  const user = useUser()
  const { t } = useTranslation()
  const { toaster } = useToaster()

  const loginError = Urls.getRequestParam('loginError')?.replace('#', '')

  const [isLocal, setIsLocal] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (user) navigate('/')
  }, [navigate, user])

  useEffect(() => {
    if (!Objects.isEmpty(loginError)) toaster.error(t(loginError))

    dispatch(LoginActions.initLogin())
  }, [dispatch, loginError, t, toaster])

  const onLogin = () => {
    const fieldErrors = LoginValidator.localValidate(email, password)
    setErrors(fieldErrors)

    if (!isError(fieldErrors)) {
      dispatch(
        LoginActions.localLogin({
          email,
          password,
          navigate,
        })
      )
    }
  }

  if (isLocal) {
    return (
      <div className="login__form">
        <input
          onFocus={() => setErrors({ ...errors, email: null })}
          name="email"
          value={email}
          type="text"
          placeholder={t('login.email')}
          onChange={(event) => setEmail(event.target.value)}
        />
        {errors.email && <span className="login__field-error">{t(errors.email)}</span>}

        <input
          onFocus={() => setErrors({ ...errors, password: null })}
          value={password}
          type="password"
          placeholder={t('login.password')}
          onChange={(event) => setPassword(event.target.value)}
        />
        {errors.password && <span className="login__field-error">{t(errors.password)}</span>}

        <div>
          <button type="button" className="btn" onClick={() => setIsLocal(false)}>
            {t('login.cancel')}
          </button>

          <button type="button" className="btn" onClick={onLogin}>
            {t('login.login')}
          </button>
        </div>

        <Link
          to={ClientRoutes.Assessment.Cycle.Login.ResetPassword.getLink({
            assessmentName: assessment.props.name,
            cycleName: cycle.name,
          })}
          type="button"
          className="btn-forgot-pwd"
        >
          {t('login.forgotPassword')}
        </Link>
      </div>
    )
  }

  return (
    <div className="login__formWrapper">
      <div>
        <a
          className="btn"
          href={`${ApiEndPoint.Auth.google()}?assessmentName=${assessment.props.name}&cycleName=${cycle.name}`}
        >
          {t('login.signInGoogle')}
        </a>

        <button className="btn" type="button" onClick={() => setIsLocal(true)}>
          {t('login.signInFRA')}
        </button>
      </div>

      <div>
        <div>
          {t('login.accessLimited')}
          <br />
          {t('login.returnHome')} <a href="/">{t('login.returnHomeClick')}</a>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
