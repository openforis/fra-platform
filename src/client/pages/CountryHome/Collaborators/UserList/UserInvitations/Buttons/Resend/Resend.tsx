import React from 'react'
import { useTranslation } from 'react-i18next'

import { TooltipId } from 'meta/tooltip'
import { UserInvitations, UserInvitationSummary } from 'meta/user'

import Icon from 'client/components/Icon'

import { useResendInvitation } from '../hooks/useResendInvitation'

interface Props {
  invitationSummary: UserInvitationSummary
}

const Information: React.FC<Props> = (props: Props) => {
  const { invitationSummary } = props
  const { resendInvitation, isLoading } = useResendInvitation({ invitationSummary })

  const { t } = useTranslation()

  if (!UserInvitations.isExpired(invitationSummary)) {
    return null
  }

  return (
    <button
      className="btn-s btn-link"
      data-tooltip-content={t('userManagement.inviteAgain')}
      data-tooltip-id={TooltipId.info}
      disabled={isLoading}
      onClick={resendInvitation}
      type="button"
    >
      <Icon name="icon-paper-plane" />
    </button>
  )
}

export default Information
