import React, { useEffect, useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { BasePaths } from '@client/basePaths'
import { useAppDispatch } from '@client/store'
import { LoginActions, useInvitation } from '@client/store/login'
import { LoginValidator } from '@client/pages/Login/utils/LoginValidator'

type Props = {
  invitationUuid?: string
}

const LoginForm: React.FC<Props> = (props) => {
  const { invitationUuid } = props

  const dispatch = useAppDispatch()
  const { i18n } = useTranslation()
  const history = useHistory()

  const { invitedUser } = useInvitation()

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [password2, setPassword2] = useState<string>(undefined)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    dispatch(LoginActions.initLogin())
    if (invitationUuid) {
      dispatch(LoginActions.fetchUserByInvitation(invitationUuid))
      setEmail(invitedUser.email)
    }
  }, [])

  const onCancel = () => {
    history.push(BasePaths.Root())
  }

  const onLogin = () => {
    const fieldErrors = LoginValidator.localValidate(email, password, password2)
    setErrors(fieldErrors)

    if (fieldErrors.isError) {
      dispatch(
        LoginActions.localLogin({
          email,
          password,
          invitationUuid,
        })
      )
    }
  }

  return (
    <div className="login__form">
      <input
        onFocus={() => setErrors({ ...errors, email: null })}
        value={email}
        disabled={!!invitedUser}
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
          {errors.password2 && <span className="login__field-error">{i18n.t(errors.password2)}</span>}
        </>
      )}

      {invitedUser && (
        <button type="button" className="btn" onClick={onLogin}>
          {i18n.t('login.acceptInvitation')}
        </button>
      )}

      {!invitedUser && (
        <>
          <div>
            <button type="button" className="btn" onClick={onCancel}>
              {i18n.t('login.cancel')}
            </button>

            <button type="button" className="btn" onClick={onLogin}>
              {i18n.t('login.login')}
            </button>
          </div>

          <Link to={BasePaths.Login.resetPassword()} type="button" className="btn-forgot-pwd">
            {i18n.t('login.forgotPassword')}
          </Link>
        </>
      )}
    </div>
  )
}

export default LoginForm
