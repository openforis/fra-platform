import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { TooltipId } from 'meta/tooltip'
import { RoleName, User, UserRole } from 'meta/user'
import { UserRoles } from 'meta/user/userRoles'

import { useUser } from 'client/store/user'
import { useToaster } from 'client/hooks/useToaster'
import Icon from 'client/components/Icon'

import { useRemoveInvitation } from '../hooks/useRemoveInvitation'
import { useResendInvitation } from '../hooks/useResendInvitation'
import UserInvitationInfo from '../UserInvitationInfo'

interface Props {
  invitationUuid: string
  userRole: UserRole<RoleName, any>
  user: User
}

const InvitationColumn: React.FC<Props> = (props: Props) => {
  const { invitationUuid, userRole, user } = props

  const [showInvitationInfo, setShowInvitationInfo] = useState<boolean>(false)
  const [resendInvitationLoading, setResendInvitationLoading] = useState<boolean>(false)

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
    setResendInvitationLoading(false)
  }, [toaster, t])

  const resendInvitation = useResendInvitation({
    invitationUuid,
    callback: callbackResendInvitation,
  })

  const onClickResend = useCallback(() => {
    setResendInvitationLoading(true)
    resendInvitation()
  }, [resendInvitation])

  const invitationExpired = UserRoles.isInvitationExpired(userRole)

  return (
    <>
      {invitationExpired && (
        <button
          className="btn-s btn-link"
          disabled={resendInvitationLoading}
          onClick={onClickResend}
          type="button"
          data-tooltip-id={TooltipId.info}
          data-tooltip-content={t('userManagement.inviteAgain')}
        >
          <Icon name="icon-paper-plane" />
        </button>
      )}
      {!invitationExpired && (
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
      )}

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
