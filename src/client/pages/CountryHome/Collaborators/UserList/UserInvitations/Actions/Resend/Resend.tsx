import React from 'react'

import { UserInvitationSummary } from 'meta/user'

import Button, { ButtonSize, ButtonType } from 'client/components/Buttons/Button'

import { useResendInvitation } from '../hooks/useResendInvitation'

interface Props {
  invitationSummary: UserInvitationSummary
}

const Information: React.FC<Props> = (props: Props) => {
  const { invitationSummary } = props
  const { resendInvitation, isLoading } = useResendInvitation({ invitationSummary })

  // TODO: Add tooltip: 'userManagement.inviteAgain'
  return (
    <Button
      disabled={isLoading}
      iconName="icon-paper-plane"
      inverse
      onClick={resendInvitation}
      size={ButtonSize.s}
      type={ButtonType.primary}
    />
  )
}

export default Information
