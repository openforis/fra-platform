import { RoleName, UserRole } from 'meta/user'
import { UserRoles } from 'meta/user/userRoles'

import { BaseProtocol, DB } from 'server/db'
import { UserRepository } from 'server/repository/public/user'
import { UserInvitationRepository } from 'server/repository/public/userInvitation'
import { MailService } from 'server/service'

import { AssessmentController } from '../assessment'

export const sendInvitationEmail = async (
  props: { invitationUuid: string },
  client: BaseProtocol = DB
): Promise<UserRole<RoleName>> => {
  const { invitationUuid } = props

  let userRole = await UserInvitationRepository.getOne({ invitationUuid }, client)

  const { assessment, cycle } = await AssessmentController.getOneWithCycle({
    id: userRole.assessmentId,
    cycleUuid: userRole.cycleUuid,
  })

  if (UserRoles.isInvitationExpired(userRole)) userRole = await UserInvitationRepository.renew({ userRole })

  const userToInvite = await UserRepository.getOne({ id: userRole.userId }, client)

  await MailService.userInvite({
    countryIso: userRole.countryIso,
    assessmentName: assessment.props.name,
    cycleName: cycle.name,
    role: userRole,
    userToInvite,
  })

  return userRole
}
