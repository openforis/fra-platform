import React, { useState } from 'react'
import { Urls } from '@client/utils'
import { useTranslation } from 'react-i18next'
import { Objects } from '@core/utils'

const LoginForm: React.FC = () => {
  const { i18n } = useTranslation()
  const invitation = Urls.getRequestParam('invitation')
  const isInvitation = !Objects.isEmpty(invitation)

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  // TODO:
  // Handle login
  // Handle invitation (=> get invited user details (email))
  const [password2, setPassword2] = useState<string>('')

  const onCancel = window.history.back
  const onLogin = () => console.log('not implemented')

  return (
    <div className="login__form">
      <h3>{i18n.t('login.signInFRA')}</h3>
      <input
        value={email || ''}
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

      {invitation && (
        <input
          value={password2}
          type="password"
          placeholder={i18n.t('login.repeatPassword')}
          onChange={(event) => setPassword2(event.target.value)}
        />
      )}

      <div>
        <button type="button" className="btn" onClick={onCancel}>
          {i18n.t('login.cancel')}
        </button>

        <button type="button" className="btn" onClick={onLogin}>
          {i18n.t('login.login')}
        </button>
      </div>

      <button type="button" className="btn-forgot-pwd" onClick={console.log}>
        {i18n.t('login.forgotPassword')}
      </button>

      <hr className="divider" />

      <a className="btn" href={`/auth/google${invitation ? `?i=${invitation}` : ''}`}>
        {i18n.t('login.signInGoogle')}
      </a>
    </div>
  )
}

export default LoginForm
