import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { TooltipId } from 'meta/tooltip'
import { RoleName, User, UserRole } from 'meta/user'
import { UserRoles } from 'meta/user/userRoles'

import { useUser } from 'client/store/user'
import { useToaster } from 'client/hooks/useToaster'
import Icon from 'client/components/Icon'
import { useRemoveInvitation } from 'client/components/UserList/hooks/useRemoveInvitation'
import { useResendInvitation } from 'client/components/UserList/hooks/useResendInvitation'
import UserInvitationInfo from 'client/components/UserList/UserInvitationInfo'

interface Props {
  invitationUuid: string
  userRole: UserRole<RoleName, any>
  user: User
}

const InvitationColumn: React.FC<Props> = (props: Props) => {
  const { invitationUuid, userRole, user } = props

  const [showInvitationInfo, setShowInvitationInfo] = useState<boolean>(false)

  const { t } = useTranslation()
  const { toaster } = useToaster()

  const currentUser = useUser()

  const callbackRemoveInvitation = useCallback(() => {
    toaster.success(t('userManagement.invitationDeleted'))
  }, [toaster, t])

  const removeInvitation = useRemoveInvitation({
    user,
    invitationUuid,
    callback: callbackRemoveInvitation,
  })

  const callbackResendInvitation = useCallback(() => {
    toaster.success(t('userManagement.invitationEmailSent'))
  }, [toaster, t])

  const resendInvitation = useResendInvitation({
    invitationUuid,
    callback: callbackResendInvitation,
  })

  if (UserRoles.isInvitationExpired(userRole))
    return (
      <button
        className="btn-s btn-link"
        onClick={resendInvitation}
        type="button"
        data-tooltip-id={TooltipId.info}
        data-tooltip-content={t('userManagement.inviteAgain')}
      >
        <Icon name="icon-paper-plane" />
      </button>
    )

  return (
    <>
      <button
        key={0}
        className="btn-s btn-link"
        onClick={() => setShowInvitationInfo(true)}
        type="button"
        data-tooltip-id={TooltipId.info}
        data-tooltip-content={t('userManagement.invitationLink')}
      >
        <Icon name="round-e-info" />
      </button>

      <button
        key={1}
        className="btn-s btn-link-destructive"
        disabled={currentUser.id === user.id}
        onClick={removeInvitation}
        type="button"
        data-tooltip-id={TooltipId.error}
        data-tooltip-content={t('userManagement.remove')}
      >
        <Icon name="trash-simple" />
      </button>
      {showInvitationInfo ? <UserInvitationInfo user={user} onClose={() => setShowInvitationInfo(false)} /> : null}
    </>
  )
}

export default InvitationColumn
