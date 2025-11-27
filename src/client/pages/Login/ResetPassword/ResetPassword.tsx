import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'

import { ApiEndPoint } from 'meta/api/endpoint'

import { useAppDispatch } from 'client/store/hooks'
import { LoginActions } from 'client/store/login/actions'
import { useAssessment } from 'client/store/meta/hooks/assessments'
import { useCycle } from 'client/store/meta/hooks/cycles'
import { useGetRequest } from 'client/hooks/getRequest'
import Button, { ButtonSize } from 'client/components/Buttons/Button'
import Flex from 'client/components/Layout/Flex'
import { isError, LoginValidator } from 'client/pages/Login/utils/LoginValidator'
import { Urls } from 'client/utils/urls'

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

  const onResetPassword = async (): Promise<void> => {
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

  const onChangePassword = async (): Promise<void> => {
    const fieldErrors = LoginValidator.invitationValidate(email, password, password2)
    setErrors(fieldErrors)

    if (!isError(fieldErrors)) {
      await dispatch(LoginActions.changePassword({ email, password, resetPasswordUuid, navigate })).unwrap()
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
        onChange={(event): void => setEmail(event.target.value)}
        onFocus={(): void => setErrors({ ...errors, email: null })}
        placeholder={t('login.email')}
        type="text"
        value={email}
      />
      {errors.email && <span className="login__field-error">{t(errors.email)}</span>}

      {resetPasswordUuid && (
        <>
          <input
            onChange={(event): void => setPassword(event.target.value)}
            onFocus={(): void => setErrors({ ...errors, password: null })}
            placeholder={t('login.password')}
            type="password"
            value={password}
          />
          {errors.password && <span className="login__field-error">{t(errors.password)}</span>}

          <input
            onChange={(event): void => setPassword2(event.target.value)}
            onFocus={(): void => setErrors({ ...errors, password2: null })}
            placeholder={t('login.repeatPassword')}
            type="password"
            value={password2}
          />
          {errors.password2 && <span className="login__field-error">{t(errors.password2)}</span>}

          <Flex gap={'16'} justifyContent="center">
            <Button label={t('login.cancel')} onClick={(): Promise<void> | void => navigate(-1)} size={ButtonSize.l} />

            <Button label={t('login.changePassword')} onClick={onChangePassword} size={ButtonSize.l} />
          </Flex>
        </>
      )}

      {!resetPasswordUuid && (
        <Flex gap={'16'} justifyContent="center">
          <Button label={t('login.cancel')} onClick={(): Promise<void> | void => navigate(-1)} size={ButtonSize.l} />

          <Button label={t('login.resetPassword')} onClick={onResetPassword} size={ButtonSize.l} />
        </Flex>
      )}
    </div>
  )
}

export default ResetPassword
