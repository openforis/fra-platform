import React from 'react'
import { useTranslation } from 'react-i18next'
import { Navigate, Outlet, useNavigate } from 'react-router'

import { Assessments } from 'meta/assessment/assessments'
import { LoginInvitationQueryParams } from 'meta/routes/queryParams/invitation'
import { Routes } from 'meta/routes/routes'
import { UserInvitations } from 'meta/user/invitations'
import { Users } from 'meta/user/users'

import { useAppDispatch } from 'client/store/hooks'
import { LoginActions } from 'client/store/login/actions'
import { useInvitation } from 'client/store/login/hooks/invitation'
import { useUser } from 'client/store/user/hooks/user'
import { useSearchParams } from 'client/hooks/searchParams'
import AcceptInvitationButtons from 'client/pages/Login/components/AcceptInvitationButtons'
import AccessLimited from 'client/pages/Login/components/AccessLimited'

import { useInitInvitation } from './hooks/useInitInvitation'

const Invitation: React.FC = () => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const loggedUser = useUser()

  useInitInvitation()

  const { invitationUuid } = useSearchParams<LoginInvitationQueryParams>()
  const invitation = useInvitation()

  if (!invitation || !invitation.assessment) return null

  const { assessment, invitedUser, userInvitation, userProviders } = invitation

  const cycle = Assessments.getCycle({ assessment, cycleUuid: userInvitation?.cycleUuid })
  const assessmentName = assessment?.props.name
  const cycleName = cycle?.name

  const onAccept = async (): Promise<void> => {
    await dispatch(LoginActions.acceptInvitation({ invitationUuid })).unwrap()
    const { countryIso } = userInvitation
    navigate(Routes.Country.generatePath({ assessmentName, cycleName, countryIso }))
  }

  // If the invitation has been accepted...
  if (userInvitation?.acceptedAt) {
    // ...and the user is already logged in, redirect to root
    if (loggedUser) {
      return <Navigate replace to={Routes.Root.generatePath()} />
    }
    // and the user is not logged in, redirect to login
    return <Navigate replace to={Routes.Login.generatePath({ assessmentName, cycleName })} />
  }

  // If the invitation is expired, show error message
  if (userInvitation && UserInvitations.isExpired(userInvitation)) {
    return (
      <div className="login__form">
        <h3>{t('login.invitationExpired')}</h3>
      </div>
    )
  }

  if (!invitedUser) return null

  const invitationMessageParams = {
    assessment: t(Assessments.getShortLabel(assessmentName)),
    country: t(`area.${userInvitation.countryIso}.listName`),
    cycle: cycleName,
    role: t(Users.getI18nRoleLabelKey(userInvitation.role)),
  }
  const invitationMessage = t('login.invitationMessage', invitationMessageParams)

  const isInvitedUserLoggedIn = loggedUser?.email === invitedUser.email

  return (
    <div className="login__formWrapper">
      <h3>{invitationMessage}</h3>

      {userProviders?.length > 0 && (
        <h3>{t('login.invitationProvidersRegistered', { authProviderNames: userProviders.join(', ') })}</h3>
      )}

      <Outlet />

      {isInvitedUserLoggedIn ? (
        <button className="btn" onClick={onAccept} type="button">
          {t('login.acceptInvitation')}
        </button>
      ) : (
        <div className="login__form">
          <AcceptInvitationButtons />
        </div>
      )}

      <AccessLimited />
    </div>
  )
}

export default Invitation
