import React from 'react'

import { UserInvitationSummary } from 'meta/user'

import ActionsContainer from '../../ActionsContainer'
import Resend from './Resend/Resend'
import Information from './Information'
import Remove from './Remove'

type Props = {
  invitationSummary: UserInvitationSummary
}

const Actions: React.FC<Props> = (props: Props) => {
  const { invitationSummary } = props
  return (
    <ActionsContainer>
      <Information invitationSummary={invitationSummary} />
      <Resend invitationSummary={invitationSummary} />
      <Remove invitationSummary={invitationSummary} />
    </ActionsContainer>
  )
}

export default Actions
