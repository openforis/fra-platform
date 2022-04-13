import { RoleName, User, UserRole, UserStatus } from '@meta/user'
import { BaseProtocol, DB } from '@server/db'
import { UserRepository } from '@server/repository/public/user'
import { UserRoleRepository } from '@server/repository/public/userRole'

export const acceptInvitation = async (
  props: {
    user: User
    userRole: UserRole<RoleName, any>
  },
  client: BaseProtocol = DB
): Promise<User> => {
  const { user, userRole } = props

  return client.tx(async (t) => {
    await UserRoleRepository.acceptInvitation({ userRole }, t)
    user.status = UserStatus.active
    return UserRepository.update({ user }, t)
  })
}
