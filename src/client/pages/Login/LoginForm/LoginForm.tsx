import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'

import { Objects } from 'utils/objects'

import { ApiEndPoint } from 'meta/api/endpoint'
import { Routes } from 'meta/routes'

import { useAppDispatch } from 'client/store/hooks'
import { LoginActions } from 'client/store/login'
import { useAssessment } from 'client/store/meta/hooks/assessments'
import { useCycle } from 'client/store/meta/hooks/cycles'
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
        })
      ).then(() => {
        navigate(Routes.Root.path.absolute)
      })
    }
  }

  const assessmentName = assessment.props.name
  const cycleName = cycle.name
  if (isLocal) {
    return (
      <div className="login__form">
        <input
          name="email"
          onChange={(event) => setEmail(event.target.value)}
          onFocus={() => setErrors({ ...errors, email: null })}
          placeholder={t('login.email')}
          type="text"
          value={email}
        />
        {errors.email && <span className="login__field-error">{t(errors.email)}</span>}

        <input
          onChange={(event) => setPassword(event.target.value)}
          onFocus={() => setErrors({ ...errors, password: null })}
          placeholder={t('login.password')}
          type="password"
          value={password}
        />
        {errors.password && <span className="login__field-error">{t(errors.password)}</span>}

        <div>
          <button className="btn" onClick={() => setIsLocal(false)} type="button">
            {t('login.cancel')}
          </button>

          <button className="btn" onClick={onLogin} type="button">
            {t('login.login')}
          </button>
        </div>

        <Link
          className="btn-forgot-pwd"
          to={Routes.LoginResetPassword.generatePath({ assessmentName, cycleName })}
          type="button"
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
          href={`${ApiEndPoint.Auth.google()}?assessmentName=${assessmentName}&cycleName=${cycleName}`}
        >
          {t('login.signInGoogle')}
        </a>

        <button className="btn" onClick={() => setIsLocal(true)} type="button">
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
