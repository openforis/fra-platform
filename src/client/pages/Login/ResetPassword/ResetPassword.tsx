import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { Objects } from '@utils/objects'

import { useAppDispatch } from '@client/store'
import { LoginActions } from '@client/store/login'
import { isError, LoginValidator } from '@client/pages/Login/utils/LoginValidator'
import { Urls } from '@client/utils'

const ResetPassword: React.FC = () => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const navigate = useNavigate()

  const resetPasswordUuid = Urls.getRequestParam('resetPasswordUuid')
  const paramEmail = Urls.getRequestParam('email')

  const [email, setEmail] = useState<string>(paramEmail || '')
  const [password, setPassword] = useState<string>('')
  const [password2, setPassword2] = useState<string>('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const onResetPassword = async () => {
    const fieldErrors = LoginValidator.resetPasswordValidate(email)
    setErrors(fieldErrors)

    if (!isError(fieldErrors)) {
      dispatch(LoginActions.createResetPassword({ email, navigate }))
    }
  }

  const onChangePassword = async () => {
    const fieldErrors = LoginValidator.invitationValidate(email, password, password2)
    setErrors(fieldErrors)

    if (!isError(fieldErrors)) {
      await dispatch(LoginActions.changePassword({ email, password, resetPasswordUuid, navigate }))
    }
  }

  return (
    <div className="login__form">
      <h3>{t('login.forgotPasswordTitle')}</h3>

      <input
        onFocus={() => setErrors({ ...errors, email: null })}
        name="email"
        value={email}
        disabled={!Objects.isEmpty(paramEmail)}
        type="text"
        placeholder={t('login.email')}
        onChange={(event) => setEmail(event.target.value)}
      />
      {errors.email && <span className="login__field-error">{t(errors.email)}</span>}

      {resetPasswordUuid && (
        <>
          <input
            onFocus={() => setErrors({ ...errors, password: null })}
            value={password}
            type="password"
            placeholder={t('login.password')}
            onChange={(event) => setPassword(event.target.value)}
          />
          {errors.password && <span className="login__field-error">{t(errors.password)}</span>}

          <input
            onFocus={() => setErrors({ ...errors, password2: null })}
            value={password2}
            type="password"
            placeholder={t('login.repeatPassword')}
            onChange={(event) => setPassword2(event.target.value)}
          />
          {errors.password2 && <span className="login__field-error">{t(errors.password2)}</span>}

          <div style={{ textAlign: 'center' }}>
            <button className="btn" type="button" onClick={() => navigate(-1)}>
              {t('login.cancel')}
            </button>

            <button className="btn" type="button" onClick={onChangePassword}>
              {t('login.changePassword')}
            </button>
          </div>
        </>
      )}

      {!resetPasswordUuid && (
        <div style={{ textAlign: 'center' }}>
          <button className="btn" type="button" onClick={() => navigate(-1)}>
            {t('login.cancel')}
          </button>

          <button className="btn" type="button" onClick={onResetPassword}>
            {t('login.resetPassword')}
          </button>
        </div>
      )}
    </div>
  )
}

export default ResetPassword
