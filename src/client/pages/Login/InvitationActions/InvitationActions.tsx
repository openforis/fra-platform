import React from 'react'
import { useTranslation } from 'react-i18next'

import { Assessments } from 'meta/assessment/assessments'

import { useInvitation } from 'client/store/login/hooks/invitation'
import { useUser } from 'client/store/user/hooks/user'
import Button, { ButtonSize } from 'client/components/Buttons/Button'
import AcceptInvitationButtons from 'client/pages/Login/components/AcceptInvitationButtons'
import AccessLimited from 'client/pages/Login/components/AccessLimited'
import { useOnAccept } from 'client/pages/Login/InvitationActions/hooks/useOnAccept'

const InvitationActions: React.FC = () => {
  const { t } = useTranslation()
  const loggedUser = useUser()
  const invitation = useInvitation()
  const { assessment, invitedUser, userInvitation } = invitation
  const cycle = Assessments.getCycle({ assessment, cycleUuid: userInvitation.cycleUuid })
  const onAccept = useOnAccept({ assessment, cycle, userInvitation })

  if (!invitedUser) return null
  if (!invitation?.assessment || !invitation?.userInvitation) return null

  const isInvitedUserLoggedIn = loggedUser?.email === invitedUser.email

  return (
    <>
      {isInvitedUserLoggedIn ? (
        <Button label={t('login.acceptInvitation')} onClick={onAccept} size={ButtonSize.l} />
      ) : (
        <AcceptInvitationButtons />
      )}

      <AccessLimited />
    </>
  )
}

export default InvitationActions
