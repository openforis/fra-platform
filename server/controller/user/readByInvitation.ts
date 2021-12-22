import { BaseProtocol, DB } from '@server/db'
import { User, UserRole, RoleName } from '@meta/user'
import { UserRepository, UserRoleRepository } from '@server/repository'

export const readByInvitation = async (
  props: {
    invitationUuid: string
  },
  client: BaseProtocol = DB
): Promise<{ user: User; userRole: UserRole<RoleName> }> => {
  const { invitationUuid } = props

  return client.tx(async (t) => {
    const userRole = await UserRoleRepository.read({ invitationUuid }, t)
    const user = await UserRepository.read({ user: { id: userRole.userId } }, t)
    return {
      user,
      userRole,
    }
  })
}
