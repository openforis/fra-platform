import '../login.scss'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Urls } from '@client/utils'
import { Objects } from '@core/utils'

const ResetPassword: React.FC = () => {
  const { i18n } = useTranslation()
  const paramEmail = Urls.getRequestParam('email')
  const isParamEmail = !Objects.isEmpty(paramEmail)
  const [email, setEmail] = useState<string>(paramEmail || '')

  const onChangePassword = () => {
    console.log('not implemented')
  }

  // TODO: Make API endpoint for resetting password
  // Generate new password, change password in user profile

  return (
    <div className="login__form">
      <input
        type="text"
        name="email"
        placeholder={i18n.t('login.email')}
        value={email}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
        disabled={isParamEmail}
      />

      <button className="btn" type="button" onClick={onChangePassword}>
        {i18n.t('login.resetPassword')}
      </button>
    </div>
  )
}

export default ResetPassword
