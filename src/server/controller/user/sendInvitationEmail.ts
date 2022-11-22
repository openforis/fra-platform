import { RoleName, UserRole } from '@meta/user'
import { UserRoles } from '@meta/user/userRoles'

import { BaseProtocol, DB } from '@server/db'
import { UserRepository } from '@server/repository/public/user'
import { UserRoleRepository } from '@server/repository/public/userRole'
import { MailService } from '@server/service'

export const sendInvitationEmail = async (
  props: { invitationUuid: string },
  client: BaseProtocol = DB
): Promise<UserRole<RoleName>> => {
  const { invitationUuid } = props

  let userRole = await UserRoleRepository.read({ invitationUuid }, client)

  if (UserRoles.isInvitationExpired(userRole)) userRole = await UserRoleRepository.renewInvitation({ userRole })

  const userToInvite = await UserRepository.getOne({ id: userRole.userId }, client)

  await MailService.userInvite({
    countryIso: userRole.countryIso,
    role: userRole,
    userToInvite,
    url: process.env.APP_URI,
  })

  return userRole
}
