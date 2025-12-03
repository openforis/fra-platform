import React from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'

import { useAppDispatch } from 'client/store/hooks'
import { LoginActions } from 'client/store/login/actions'
import { useCycleRouteParams } from 'client/hooks/routeParams'
import Button, { ButtonSize } from 'client/components/Buttons/Button'
import Flex from 'client/components/Layout/Flex'

type FormData = {
  email: string
}

// TODO: Use Form component

const ResetPassword: React.FC = () => {
  const dispatch = useAppDispatch()
  const { assessmentName, cycleName } = useCycleRouteParams()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const {
    clearErrors,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<FormData>({ defaultValues: { email: '' } })

  const onSubmit = async (formData: FormData): Promise<void> => {
    if (!formData.email) return
    dispatch(LoginActions.createResetPassword({ assessmentName, cycleName, email: formData.email, navigate }))
  }

  const onCancel = (): void => {
    navigate(-1)
  }

  return (
    <div className="login__form">
      <h3>{t('login.forgotPasswordTitle')}</h3>
      <input
        onFocus={(): void => clearErrors('email')}
        placeholder={t('login.email')}
        type="text"
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...register('email', { required: true })}
      />
      {errors.email && <span className="login__field-error">{t('login.emailRequired')}</span>}

      <Flex gap={'16'} justifyContent="center">
        <Button label={t('login.cancel')} onClick={onCancel} size={ButtonSize.l} />
        <Button label={t('login.resetPassword')} onClick={handleSubmit(onSubmit)} size={ButtonSize.l} />
      </Flex>
    </div>
  )
}

export default ResetPassword
