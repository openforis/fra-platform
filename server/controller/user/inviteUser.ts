import { DB } from '@server/db'
import { RoleNames, User, UserInvitation } from '@core/meta/user'
import { ActivityLogRepository, UserRepository } from '@server/repository'
import { Assessment } from '@core/assessment'

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
    let userToIntive = await UserRepository.read({ user: { email } }, client)
    if (!user) {
      userToIntive = await UserRepository.create({ user: { email, name: '' } })
    }
    await UserRolesRepository.create({}, client)
    const userInvitation = UserInvitationRepository.create({}, client)
    await ActivityLogRepository.insertActivityLog({}, client)
    // await UserRepository.inviteUser({ user }, client)
    // insert activity log

    return {
      user: userToIntive,
      userInvitation,
    }
  })
}
