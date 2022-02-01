import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { useAppDispatch } from '@client/store'
import { LoginActions } from '@client/store/login'
import { LoginValidator } from '@client/pages/Login/utils/LoginValidator'

import { Urls } from '@client/utils'
import { Objects } from '@core/utils'

import { BasePaths } from '@client/basePaths'

const ResetPassword: React.FC = () => {
  const dispatch = useAppDispatch()
  const { i18n } = useTranslation()
  const history = useHistory()

  const resetPasswordUuid = Urls.getRequestParam('resetPasswordUuid')
  const paramEmail = Urls.getRequestParam('email')

  const [email, setEmail] = useState<string>(paramEmail || '')
  const [password, setPassword] = useState<string>('')
  const [password2, setPassword2] = useState<string>('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const onResetPassword = async () => {
    const fieldErrors = LoginValidator.resetPasswordValidate(email)
    setErrors(fieldErrors)

    if (!fieldErrors.isError) {
      try {
        await dispatch(LoginActions.createResetPassword(email)).unwrap()
        history.push(BasePaths.Root())
      } catch (rejectedValueOrSerializedError) {
        console.log(rejectedValueOrSerializedError)
      }
    }
  }

  const onChangePassword = async () => {
    const fieldErrors = LoginValidator.localValidate(email, password, password2)
    setErrors(fieldErrors)

    if (!fieldErrors.isError) {
      try {
        await dispatch(LoginActions.changePassword({ email, password, resetPasswordUuid })).unwrap()
        history.push(BasePaths.Root())
      } catch (rejectedValueOrSerializedError) {
        console.log(rejectedValueOrSerializedError)
      }
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

      {resetPasswordUuid && (
        <>
          <input
            onFocus={() => setErrors({ ...errors, password: null })}
            value={password}
            type="password"
            placeholder={i18n.t('login.password')}
            onChange={(event) => setPassword(event.target.value)}
          />
          {errors.password && <span className="login__field-error">{i18n.t(errors.password)}</span>}

          <input
            onFocus={() => setErrors({ ...errors, password2: null })}
            value={password2}
            type="password"
            placeholder={i18n.t('login.repeatPassword')}
            onChange={(event) => setPassword2(event.target.value)}
          />
          {errors.password2 && <span className="login__field-error">{i18n.t(errors.password2)}</span>}

          <div style={{ textAlign: 'center' }}>
            <button className="btn" type="button" onClick={() => history.goBack()}>
              {i18n.t('login.cancel')}
            </button>

            <button className="btn" type="button" onClick={onChangePassword}>
              {i18n.t('login.changePassword')}
            </button>
          </div>
        </>
      )}

      {!resetPasswordUuid && (
        <div style={{ textAlign: 'center' }}>
          <button className="btn" type="button" onClick={() => history.goBack()}>
            {i18n.t('login.cancel')}
          </button>

          <button className="btn" type="button" onClick={onResetPassword}>
            {i18n.t('login.resetPassword')}
          </button>
        </div>
      )}
    </div>
  )
}

export default ResetPassword
