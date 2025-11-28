import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'

import { ApiEndPoint } from 'meta/api/endpoint'
import { Routes } from 'meta/routes/routes'
import { Objects } from 'utils/objects'

import { useAppDispatch } from 'client/store/hooks'
import { LoginActions } from 'client/store/login/actions'
import { useAssessment } from 'client/store/meta/hooks/assessments'
import { useCycle } from 'client/store/meta/hooks/cycles'
import { useUser } from 'client/store/user/hooks/user'
import { useToaster } from 'client/hooks/toaster'
import Button, { ButtonSize, useButtonClassName } from 'client/components/Buttons/Button'
import Flex from 'client/components/Layout/Flex'
import Link from 'client/components/Links/Link'
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
  const linkClassName = useButtonClassName({ size: ButtonSize.l })

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

  const onLogin = (): void => {
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
          onChange={(event): void => setEmail(event.target.value)}
          onFocus={(): void => setErrors({ ...errors, email: null })}
          placeholder={t('login.email')}
          type="text"
          value={email}
        />
        {errors.email && <span className="login__field-error">{t(errors.email)}</span>}

        <input
          onChange={(event): void => setPassword(event.target.value)}
          onFocus={(): void => setErrors({ ...errors, password: null })}
          placeholder={t('login.password')}
          type="password"
          value={password}
        />
        {errors.password && <span className="login__field-error">{t(errors.password)}</span>}

        <Flex gap={'16'}>
          <Button label={t('login.cancel')} onClick={(): void => setIsLocal(false)} size={ButtonSize.l} />

          <Button className="btn" label={t('login.login')} onClick={onLogin} size={ButtonSize.l} />
        </Flex>

        <Link className="btn-forgot-pwd" to={Routes.LoginResetPassword.generatePath({ assessmentName, cycleName })}>
          {t('login.forgotPassword')}
        </Link>
      </div>
    )
  }

  return (
    <div className="login__formWrapper">
      <Flex gap={'16'}>
        <a
          className={linkClassName}
          href={`${ApiEndPoint.Auth.google()}?assessmentName=${assessmentName}&cycleName=${cycleName}`}
        >
          {t('login.signInGoogle')}
        </a>

        <Button label={t('login.signInFRA')} onClick={() => setIsLocal(true)} size={ButtonSize.l} />
      </Flex>

      <div>
        <div>
          {t('login.accessLimited')}
          <br />
          {t('login.returnHome')} <Link to="/">{t('login.returnHomeClick')}</Link>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
