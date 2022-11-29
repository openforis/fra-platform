import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'

import { Objects } from '@utils/index'

import { ApiEndPoint } from '@meta/api/endpoint'
import { ClientRoutes } from '@meta/app'
import { AuthProvider } from '@meta/user'

import { useAppDispatch } from '@client/store'
import { LoginActions, useInvitation } from '@client/store/login'
import { useToaster } from '@client/hooks/useToaster'
import { isError, LoginValidator } from '@client/pages/Login/utils/LoginValidator'
import { Urls } from '@client/utils/urls'

type Props = {
  invitationUuid?: string
}

const LoginForm: React.FC<Props> = (props: Props) => {
  const { invitationUuid } = props

  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const loginError = Urls.getRequestParam('loginError')
  const { toaster } = useToaster()

  const { invitedUser, userProviders } = useInvitation()

  const [loginLocal, setLoginLocal] = useState(false)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [password2, setPassword2] = useState<string>('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (!Objects.isEmpty(loginError)) toaster.error(t(loginError))
    dispatch(LoginActions.initLogin())
    if (invitationUuid) {
      dispatch(LoginActions.fetchUserByInvitation({ invitationUuid }))
    }
  }, [dispatch, invitationUuid, loginError, t, toaster])

  useEffect(() => {
    if (invitedUser?.email) setEmail(invitedUser.email)
  }, [invitedUser?.email])

  const onInvitation = () => {
    const fieldErrors = LoginValidator.invitationValidate(email, password, password2)
    setErrors(fieldErrors)

    if (!isError(fieldErrors)) {
      dispatch(
        LoginActions.localLogin({
          email,
          password,
          invitationUuid,
          navigate,
        })
      )
    }
  }

  const onLogin = () => {
    const fieldErrors = LoginValidator.localValidate(email, password)
    setErrors(fieldErrors)

    if (!isError(fieldErrors)) {
      dispatch(
        LoginActions.localLogin({
          email,
          password,
          invitationUuid,
          navigate,
        })
      )
    }
  }

  if (loginLocal)
    return (
      <div className="login__form">
        <input
          onFocus={() => setErrors({ ...errors, email: null })}
          name="email"
          value={email}
          disabled={!!invitedUser}
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

        {userProviders && !userProviders?.includes(AuthProvider.local) && (
          <>
            <input
              onFocus={() => setErrors({ ...errors, password2: null })}
              value={password2}
              type="password"
              placeholder={t('login.repeatPassword')}
              onChange={(event) => setPassword2(event.target.value)}
            />
            {errors.password2 && <span className="login__field-error">{t(errors.password2)}</span>}
          </>
        )}

        {invitedUser && (
          <button type="button" className="btn" onClick={onInvitation}>
            {t('login.acceptInvitation')}
          </button>
        )}

        {!invitedUser && (
          <div>
            <button type="button" className="btn" onClick={() => setLoginLocal(false)}>
              {t('login.cancel')}
            </button>

            <button type="button" className="btn" onClick={onLogin}>
              {t('login.login')}
            </button>
          </div>
        )}

        {(!userProviders || userProviders.includes(AuthProvider.local)) && (
          <Link to={ClientRoutes.Login.ResetPassword.getLink()} type="button" className="btn-forgot-pwd">
            {t('login.forgotPassword')}
          </Link>
        )}
      </div>
    )

  return (
    <div className="login__formWrapper">
      <div>
        <a className="btn" href={ApiEndPoint.Auth.google()}>
          {t('login.signInGoogle')}
        </a>

        <button className="btn" type="button" onClick={() => setLoginLocal(true)}>
          {t('login.signInFRA')}
        </button>
      </div>
      <div>
        <div>{t('login.accessLimited')}</div>

        <div>
          {t('login.returnHome')} <a href="/">{t('login.returnHomeClick')}</a>
        </div>
      </div>
    </div>
  )
}

LoginForm.defaultProps = {
  invitationUuid: null,
}

export default LoginForm
