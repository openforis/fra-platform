import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { useAppDispatch } from '@client/store'
import { LoginActions } from '@client/store/login'
import { Urls } from '@client/utils'
import { Objects } from '@core/utils'

import { BasePaths } from '@client/basePaths'

const ResetPassword: React.FC = () => {
  const dispatch = useAppDispatch()
  const { i18n } = useTranslation()
  const history = useHistory()

  const paramEmail = Urls.getRequestParam('email')

  const [email, setEmail] = useState<string>(paramEmail || '')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const onResetPassword = async () => {
    try {
      await dispatch(LoginActions.createResetPassword(email)).unwrap()
      history.push(BasePaths.Root())
    } catch (rejectedValueOrSerializedError) {
      console.log(rejectedValueOrSerializedError)
    }
  }

  return (
    <div className="login__form">
      <h3>{i18n.t('login.forgotPasswordTitle')}</h3>

      <input
        onFocus={() => setErrors({ ...errors, email: null })}
        name="email"
        value={email}
        disabled={!Objects.isEmpty(paramEmail)}
        type="text"
        placeholder={i18n.t('login.email')}
        onChange={(event) => setEmail(event.target.value)}
      />
      {errors.email && <span className="login__field-error">{i18n.t(errors.email)}</span>}

      <div style={{ textAlign: 'center' }}>
        <button className="btn" type="button" onClick={() => history.goBack()}>
          {i18n.t('login.cancel')}
        </button>

        <button className="btn" type="button" onClick={onResetPassword}>
          {i18n.t('login.resetPassword')}
        </button>
      </div>
    </div>
  )
}

export default ResetPassword
