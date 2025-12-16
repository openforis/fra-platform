import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, Navigate } from 'react-router'

import { Assessments } from 'meta/assessment/assessments'
import { LoginInvitationQueryParams } from 'meta/routes/queryParams/invitation'
import { Routes } from 'meta/routes/routes'
import { AuthProvider } from 'meta/user/auth'
import { UserInvitations } from 'meta/user/invitations'
import { Objects } from 'utils/objects'

import { useAppDispatch } from 'client/store/hooks'
import { LoginActions } from 'client/store/login/actions'
import { useAcceptInvitationForm, useInvitation } from 'client/store/login/hooks/invitation'
import { useUser } from 'client/store/user/hooks/user'
import { useSearchParams } from 'client/hooks/searchParams'
import { useInitInvitation } from 'client/pages/LoginDeprecated/Invitation/hooks/useInitInvitation'

const InvitationLocal: React.FC = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const loggedUser = useUser()

  // Init invitation in case the component is accessed directly through the URL
  useInitInvitation()

  const { invitationUuid, lang } = useSearchParams<LoginInvitationQueryParams>()
  const { assessment, invitedUser, userInvitation, userProviders } = useInvitation()

  const formData = useAcceptInvitationForm()
  const errors = formData?.errors ?? {}

  const cycle = Assessments.getCycle({ assessment, cycleUuid: userInvitation?.cycleUuid })
  const assessmentName = assessment?.props.name
  const cycleName = cycle?.name

  const showPassword2 =
    (invitedUser && !userProviders) || (userProviders && !userProviders.includes(AuthProvider.local))
  const showForgotPassword = !userProviders || userProviders.includes(AuthProvider.local)

  useEffect(() => {
    if (invitedUser?.email && Objects.isEmpty(formData?.email)) {
      dispatch(LoginActions.updateAcceptInvitationForm({ email: invitedUser.email }))
    }
  }, [dispatch, formData, invitedUser?.email])

  if (!invitedUser) return null

  if (
    loggedUser?.email === invitedUser.email ||
    userInvitation?.acceptedAt ||
    (userInvitation && UserInvitations.isExpired(userInvitation))
  ) {
    return (
      <Navigate
        replace
        to={Routes.LoginInvitation.generatePath({ cycleName, assessmentName }, { invitationUuid, lang })}
      />
    )
  }

  return (
    <div className="login__formWrapper">
      <div className="login__form">
        <input
          disabled={!!invitedUser}
          name="email"
          onChange={(event): void => {
            dispatch(LoginActions.updateAcceptInvitationForm({ email: event.target.value }))
          }}
          onFocus={(): void => {
            LoginActions.updateAcceptInvitationFormErrors({ email: null })
          }}
          placeholder={t('login.email')}
          type="text"
          value={formData?.email ?? ''}
        />
        {errors.email?.length > 0 && <span className="login__field-error">{t(errors.email)}</span>}

        <input
          onChange={(event): void => {
            dispatch(LoginActions.updateAcceptInvitationForm({ password: event.target.value }))
          }}
          onFocus={(): void => {
            LoginActions.updateAcceptInvitationFormErrors({ password: null })
          }}
          placeholder={t('login.password')}
          type="password"
          value={formData?.password ?? ''}
        />
        {errors.password?.length > 0 && <span className="login__field-error">{t(errors.password)}</span>}

        {showPassword2 && (
          <>
            <input
              onChange={(event): void => {
                dispatch(LoginActions.updateAcceptInvitationForm({ password2: event.target.value }))
              }}
              onFocus={(): void => {
                LoginActions.updateAcceptInvitationFormErrors({ password2: null })
              }}
              placeholder={t('login.repeatPassword')}
              type="password"
              value={formData?.password2 ?? ''}
            />
            {errors.password2?.length > 0 && <span className="login__field-error">{t(errors.password2)}</span>}
          </>
        )}

        {showForgotPassword && (
          <Link
            className="btn-forgot-pwd"
            to={Routes.LoginResetPassword.generatePath({ assessmentName, cycleName })}
            type="button"
          >
            {t('login.forgotPassword')}
          </Link>
        )}
      </div>
    </div>
  )
}

export default InvitationLocal
