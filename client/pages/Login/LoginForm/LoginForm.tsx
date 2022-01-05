import React, { useEffect, useState } from 'react'
import { useHistory, Link } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '@client/store'
import { LoginActions } from '@client/store/login'
import { Urls } from '@client/utils'
import { useTranslation } from 'react-i18next'
import { Objects } from '@core/utils'
import { BasePaths } from '@client/basePaths'

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

  useEffect(() => {
    dispatch(LoginActions.initLogin())
    if (invitationUuid) {
      dispatch(LoginActions.fetchUserByInvitation(invitationUuid))
    }
  }, [])

  const onCancel = window.history.back

  const onLogin = () => history.push(BasePaths.Root())

  const onAccept = () => {
    dispatch(LoginActions.acceptInvitation(invitationUuid))
    history.push(BasePaths.Root())
  }

  return (
    <div className="login__form">
      <input
        value={invitedUser ? invitedUser.email : email || ''}
        disabled={isInvitation}
        type="text"
        placeholder={i18n.t('login.email')}
        onChange={(event) => setEmail(event.target.value)}
      />

      <input
        value={password}
        type="password"
        placeholder={i18n.t('login.password')}
        onChange={(event) => setPassword(event.target.value)}
      />

      {invitationUuid && (
        <>
          {invitedUser && invitedUser.status !== 'active' && (
            <input
              value={password2}
              type="password"
              placeholder={i18n.t('login.repeatPassword')}
              onChange={(event) => setPassword2(event.target.value)}
            />
          )}

          <button type="button" className="btn" onClick={onAccept}>
            {i18n.t('invitation.acceptInvitation')}
          </button>
        </>
      )}

      {!invitationUuid && (
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
