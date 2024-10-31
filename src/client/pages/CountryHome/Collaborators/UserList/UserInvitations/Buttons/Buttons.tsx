import React from 'react'

import { UserInvitationSummary } from 'meta/user'

import Resend from './Resend/Resend'
// import Information from './Information'
import Remove from './Remove'

type Props = {
  invitationSummary: UserInvitationSummary
}

const Buttons: React.FC<Props> = (props: Props) => {
  const { invitationSummary } = props
  return (
    <div className="button-container">
      {/* <Information invitationSummary={invitationSummary} /> */}
      <Resend invitationSummary={invitationSummary} />
      <Remove invitationSummary={invitationSummary} />
    </div>
  )
}

export default Buttons
