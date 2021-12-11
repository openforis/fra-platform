import { BaseProtocol, DB } from '@server/db'
import { RoleName, User, UserRole, UserStatus } from '@core/meta/user'
import { UserRepository, UserRoleRepository } from '@server/repository'

export const acceptInvitation = async (
  props: {
    user: User
    userRole: UserRole<RoleName, any>
  },
  client: BaseProtocol = DB
): Promise<User> => {
  const { user, userRole } = props

  return client.tx(async (t) => {
    await UserRoleRepository.update({ userRole, accept: true }, t)
    user.status = UserStatus.active
    return UserRepository.update({ user }, t)
  })
}
