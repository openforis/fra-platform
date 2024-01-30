import React from 'react'
import { useTranslation } from 'react-i18next'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'

import { Assessments } from 'meta/assessment'
import { LoginInvitationQueryParams, Routes } from 'meta/routes'
import { AuthProvider, Users } from 'meta/user'
import { UserRoles } from 'meta/user/userRoles'

import { useAppDispatch } from 'client/store'
import { LoginActions, useInvitation } from 'client/store/login'
import { useAcceptInvitationForm } from 'client/store/login/hooks'
import { useUser } from 'client/store/user'
import { useIsInvitationLocalRoute } from 'client/hooks/useIsRoute'
import { useSearchParams } from 'client/hooks/useSearchParams'
import AcceptInvitationButtons from 'client/pages/Login/components/AcceptInvitationButtons'
import AccessLimited from 'client/pages/Login/components/AccessLimited'

import { useInitInvitation } from './hooks/useInitInvitation'
import { useOnAcceptInvitationLocal } from './hooks/useOnAcceptInvitationLocal'

const Invitation: React.FC = () => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const loggedUser = useUser()
  const isInInvitationLocal = useIsInvitationLocalRoute()

  useInitInvitation()

  const { invitationUuid, lang } = useSearchParams<LoginInvitationQueryParams>()
  const { assessment, invitedUser, userProviders, userRole } = useInvitation()

  const cycle = assessment?.cycles.find((cycle) => cycle.uuid === userRole.cycleUuid)
  const assessmentName = assessment?.props.name
  const cycleName = cycle?.name

  const formData = useAcceptInvitationForm()
  const showPassword2 =
    (invitedUser && !userProviders) || (userProviders && !userProviders.includes(AuthProvider.local))

  const onAcceptInvitationLocal = useOnAcceptInvitationLocal({ formData, invitationUuid, showPassword2 })

  const onAccept = () => {
    dispatch(LoginActions.acceptInvitation({ invitationUuid }))
    navigate(Routes.Root.generatePath())
  }

  const goToAcceptInvitationLocal = () => {
    navigate(Routes.LoginInvitationLocal.generatePath({ assessmentName, cycleName }, { invitationUuid, lang }))
  }

  if (userRole?.acceptedAt) {
    if (loggedUser) {
      return <Navigate to={Routes.Root.generatePath()} replace />
    }
    return <Navigate to={Routes.Login.generatePath({ assessmentName, cycleName })} replace />
  }

  if (userRole && UserRoles.isInvitationExpired(userRole)) {
    return (
      <div className="login__form">
        <h3>{t('login.invitationExpired')}</h3>
      </div>
    )
  }

  if (!invitedUser) return null

  return (
    <div className="login__formWrapper">
      <h3>
        {t('login.invitationMessage', {
          assessment: t(Assessments.getShortLabel(assessmentName)),
          country: t(`area.${userRole.countryIso}.listName`),
          cycle: cycleName,
          role: t(Users.getI18nRoleLabelKey(userRole.role)),
        })}
      </h3>

      {userProviders?.length > 0 && (
        <h3>{t('login.invitationProvidersRegistered', { authProviderNames: userProviders.join(', ') })}</h3>
      )}

      <Outlet />

      {loggedUser?.email === invitedUser.email ? (
        <button type="button" className="btn" onClick={onAccept}>
          {t('login.acceptInvitation')}
        </button>
      ) : (
        <div className="login__form">
          <AcceptInvitationButtons
            onAcceptInvitationLocalClick={isInInvitationLocal ? onAcceptInvitationLocal : goToAcceptInvitationLocal}
          />
        </div>
      )}

      <AccessLimited />
    </div>
  )
}

export default Invitation
