import { DB } from '@server/db'
import { RoleNames, User, UserInvitation } from '@core/meta/user'
import { UserRepository, UserInvitationRepository } from '@server/repository'
import { Assessment } from '@core/meta/assessment'

export const inviteUser = async (props: {
  assessment: Assessment
  countryIso: string
  cycleUuid: string
  email: string
  roleName: RoleNames
  user: User
}): Promise<{ userInvitation: UserInvitation; user: User }> => {
  const { email, user } = props

  return DB.tx(async (client) => {
    // 1. fetch user
    let userToInvite = await UserRepository.read({ user: { email } }, client)
    if (!user) {
      userToInvite = await UserRepository.create({ user: { email, name: '' } })
    }
    // await UserRolesRepository.create({}, client)
    const userInvitation = await UserInvitationRepository.create({ user: userToInvite }, client)
    // await ActivityLogRepository.insertActivityLog({}, client)
    // await UserRepository.inviteUser({ user }, client)
    // insert activity log

    return {
      userInvitation,
      user: userToInvite,
    }
  })
}
