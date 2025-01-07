import { UserInvitation, UserInvitations } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'
import { UserRepository } from 'server/repository/public/user'
import { UserInvitationRepository } from 'server/repository/public/userInvitation'
import { MailService } from 'server/service'

import { AssessmentController } from '../assessment'

type Props = { invitationUuid: string }

export const sendInvitationEmail = async (props: Props, client: BaseProtocol = DB): Promise<UserInvitation> => {
  const { invitationUuid } = props

  let userInvitation = await UserInvitationRepository.getOne({ invitationUuid }, client)

  const uuid = userInvitation.assessmentUuid
  const { cycleUuid } = userInvitation
  const { assessment, cycle } = await AssessmentController.getOneWithCycle({ uuid, cycleUuid })

  if (UserInvitations.isExpired(userInvitation))
    userInvitation = await UserInvitationRepository.renew({ invitation: userInvitation })

  const userToInvite = await UserRepository.getOne({ uuid: userInvitation.userUuid }, client)

  const { countryIso } = userInvitation
  const assessmentName = assessment.props.name
  const cycleName = cycle.name
  const mailProps = { countryIso, assessmentName, cycleName, userInvitation, userToInvite }
  await MailService.userInvite(mailProps)

  return userInvitation
}
