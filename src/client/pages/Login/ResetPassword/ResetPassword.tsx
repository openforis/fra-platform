import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { ApiEndPoint } from 'meta/api/endpoint'

import { useAssessment, useCycle } from 'client/store/assessment'
import { useAppDispatch } from 'client/store/hooks'
import { LoginActions } from 'client/store/login'
import { useGetRequest } from 'client/hooks'
import { isError, LoginValidator } from 'client/pages/Login/utils/LoginValidator'
import { Urls } from 'client/utils'

const ResetPassword: React.FC = () => {
  const dispatch = useAppDispatch()
  const assessment = useAssessment()
  const cycle = useCycle()

  const { t } = useTranslation()
  const navigate = useNavigate()

  const resetPasswordUuid = Urls.getRequestParam('resetPasswordUuid')

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [password2, setPassword2] = useState<string>('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const { data, dispatch: fetchData } = useGetRequest(ApiEndPoint.User.resetPassword(), {
    params: { resetPasswordUuid },
  })

  useEffect(() => {
    if (resetPasswordUuid) fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetPasswordUuid])

  useEffect(() => {
    if (data?.user?.email) setEmail(data.user.email)
  }, [data])

  const onResetPassword = async () => {
    const fieldErrors = LoginValidator.resetPasswordValidate(email)
    setErrors(fieldErrors)

    if (!isError(fieldErrors)) {
      dispatch(
        LoginActions.createResetPassword({
          assessmentName: assessment.props.name,
          cycleName: cycle.name,
          email,
          navigate,
        })
      )
    }
  }

  const onChangePassword = async () => {
    const fieldErrors = LoginValidator.invitationValidate(email, password, password2)
    setErrors(fieldErrors)

    if (!isError(fieldErrors)) {
      await dispatch(LoginActions.changePassword({ email, password, resetPasswordUuid, navigate }))
    }
  }

  if (!!resetPasswordUuid && !data?.user?.email)
    return (
      <div className="login__form">
        <h3>{t('login.expired')}</h3>
      </div>
    )

  return (
    <div className="login__form">
      {!resetPasswordUuid && <h3>{t('login.forgotPasswordTitle')}</h3>}

      <input
        disabled={!!resetPasswordUuid}
        name="email"
        onChange={(event) => setEmail(event.target.value)}
        onFocus={() => setErrors({ ...errors, email: null })}
        placeholder={t('login.email')}
        type="text"
        value={email}
      />
      {errors.email && <span className="login__field-error">{t(errors.email)}</span>}

      {resetPasswordUuid && (
        <>
          <input
            onChange={(event) => setPassword(event.target.value)}
            onFocus={() => setErrors({ ...errors, password: null })}
            placeholder={t('login.password')}
            type="password"
            value={password}
          />
          {errors.password && <span className="login__field-error">{t(errors.password)}</span>}

          <input
            onChange={(event) => setPassword2(event.target.value)}
            onFocus={() => setErrors({ ...errors, password2: null })}
            placeholder={t('login.repeatPassword')}
            type="password"
            value={password2}
          />
          {errors.password2 && <span className="login__field-error">{t(errors.password2)}</span>}

          <div style={{ textAlign: 'center' }}>
            <button className="btn" onClick={() => navigate(-1)} type="button">
              {t('login.cancel')}
            </button>

            <button className="btn" onClick={onChangePassword} type="button">
              {t('login.changePassword')}
            </button>
          </div>
        </>
      )}

      {!resetPasswordUuid && (
        <div style={{ textAlign: 'center' }}>
          <button className="btn" onClick={() => navigate(-1)} type="button">
            {t('login.cancel')}
          </button>

          <button className="btn" onClick={onResetPassword} type="button">
            {t('login.resetPassword')}
          </button>
        </div>
      )}
    </div>
  )
}

export default ResetPassword
