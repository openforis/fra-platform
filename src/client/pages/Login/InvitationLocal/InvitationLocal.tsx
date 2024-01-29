import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, Navigate } from 'react-router-dom'

import { LoginInvitationQueryParams, Routes } from 'meta/routes'
import { AuthProvider } from 'meta/user'
import { UserRoles } from 'meta/user/userRoles'

import { useInvitation } from 'client/store/login'
import { useUser } from 'client/store/user'
import { useSearchParams } from 'client/hooks/useSearchParams'
import AcceptInvitationButtons from 'client/pages/Login/components/AcceptInvitationButtons'
import { useInitInvitation } from 'client/pages/Login/Invitation/hooks/useInitInvitation'

import { useOnAcceptInvitationLocal } from './hooks/useOnAcceptInvitationLocal'

export type InvitationLocalFormData = {
  email: string
  password: string
  password2: string
}

const InvitationLocal: React.FC = () => {
  const { t } = useTranslation()
  const loggedUser = useUser()

  // Init invitation in case the component is accessed directly through the URL
  useInitInvitation()

  const { invitationUuid, lang } = useSearchParams<LoginInvitationQueryParams>()
  const { assessment, invitedUser, userProviders, userRole } = useInvitation()

  const [formData, setFormData] = useState<InvitationLocalFormData>({
    email: '',
    password: '',
    password2: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const cycle = assessment?.cycles.find((cycle) => cycle.uuid === userRole.cycleUuid)
  const assessmentName = assessment?.props.name
  const cycleName = cycle?.name

  const showPassword2 =
    (invitedUser && !userProviders) || (userProviders && !userProviders.includes(AuthProvider.local))
  const showForgotPassword = !userProviders || userProviders.includes(AuthProvider.local)

  useEffect(() => {
    if (invitedUser?.email && formData.email.length === 0) setFormData({ ...formData, email: invitedUser.email })
  }, [formData, invitedUser?.email])

  const onAcceptInvitation = useOnAcceptInvitationLocal({ formData, invitationUuid, setErrors, showPassword2 })

  if (!invitedUser) return null

  if (
    loggedUser?.email === invitedUser.email ||
    userRole?.acceptedAt ||
    (userRole && UserRoles.isInvitationExpired(userRole))
  ) {
    return (
      <Navigate
        to={Routes.LoginInvitation.generatePath({ cycleName, assessmentName }, { invitationUuid, lang })}
        replace
      />
    )
  }

  return (
    <div className="login__formWrapper">
      <div className="login__form">
        <input
          disabled={!!invitedUser}
          name="email"
          onFocus={() => setErrors({ ...errors, email: null })}
          onChange={(event) => setFormData({ ...formData, email: event.target.value })}
          placeholder={t('login.email')}
          type="text"
          value={formData.email}
        />
        {errors.email?.length > 0 && <span className="login__field-error">{t(errors.email)}</span>}

        <input
          onFocus={() => setErrors({ ...errors, password: null })}
          onChange={(event) => setFormData({ ...formData, password: event.target.value })}
          placeholder={t('login.password')}
          type="password"
          value={formData.password}
        />
        {errors.password?.length > 0 && <span className="login__field-error">{t(errors.password)}</span>}

        {showPassword2 && (
          <>
            <input
              onFocus={() => setErrors({ ...errors, password2: null })}
              onChange={(event) => setFormData({ ...formData, password2: event.target.value })}
              placeholder={t('login.repeatPassword')}
              type="password"
              value={formData.password2}
            />
            {errors.password2?.length > 0 && <span className="login__field-error">{t(errors.password2)}</span>}
          </>
        )}

        {showForgotPassword && (
          <Link
            className="btn-forgot-pwd"
            to={Routes.LoginResetPassword.generatePath({
              assessmentName,
              cycleName,
            })}
            type="button"
          >
            {t('login.forgotPassword')}
          </Link>
        )}

        <AcceptInvitationButtons onAcceptInvitationLocalClick={onAcceptInvitation} />
      </div>
    </div>
  )
}

export default InvitationLocal
