import React, { useEffect, useState } from 'react'
import { useHistory, Link } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '@client/store'
import { LoginActions } from '@client/store/login'
import { Urls } from '@client/utils'
import { useTranslation } from 'react-i18next'
import { Objects } from '@core/utils'
import { BasePaths } from '@client/basePaths'
import { LoginValidator } from '@client/pages/Login/utils/LoginValidator'

const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch()
  const { i18n } = useTranslation()
  const history = useHistory()

  const invitationUuid = Urls.getRequestParam('invitationUuid')
  const isInvitation = !Objects.isEmpty(invitationUuid)
  const { user: invitedUser } = useAppSelector((state) => state.login.invitation)

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [password2, setPassword2] = useState<string>('')

  const [errors, setErrors] = useState<Record<string, string>>({})
  useEffect(() => {
    dispatch(LoginActions.resetLogin())
    dispatch(LoginActions.initLogin())
    if (invitationUuid) {
      dispatch(LoginActions.fetchUserByInvitation(invitationUuid))
    }
  }, [])

  const onCancel = window.history.back

  const onLogin = () => {
    const fieldErrors = LoginValidator.localValidate(email, password)
    setErrors(fieldErrors)

    if (!fieldErrors.password && !fieldErrors.email) {
      dispatch(
        LoginActions.localLogin({
          email,
          password,
        })
      )
    }
  }

  const onAccept = () => {
    dispatch(LoginActions.acceptInvitation(invitationUuid))
    history.push(BasePaths.Root())
  }

  return (
    <div className="login__form">
      <input
        onFocus={() => setErrors({ ...errors, email: null })}
        value={invitedUser ? invitedUser.email : email || ''}
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

      {invitedUser && invitedUser.status !== 'active' && (
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

      {invitedUser && (
        <button type="button" className="btn" onClick={onAccept}>
          {i18n.t('invitation.acceptInvitation')}
        </button>
      )}

      {!invitedUser && (
        <>
          <button type="button" className="btn" onClick={onCancel}>
            {i18n.t('login.cancel')}
          </button>

          <button type="button" className="btn" onClick={onLogin}>
            {i18n.t('login.login')}
          </button>

          <Link to={BasePaths.Login.resetPassword()} type="button" className="btn-forgot-pwd">
            {i18n.t('login.forgotPassword')}
          </Link>
        </>
      )}
    </div>
  )
}

export default LoginForm
