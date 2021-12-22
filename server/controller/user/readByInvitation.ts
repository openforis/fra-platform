import { BaseProtocol, DB } from '@server/db'
import { User } from '@meta/user'
import { UserRepository, UserRoleRepository } from '@server/repository'

export const readByInvitation = async (
  props: {
    invitationUuid: string
  },
  client: BaseProtocol = DB
): Promise<User> => {
  const { invitationUuid } = props

  return client.tx(async (t) => {
    const userRole = await UserRoleRepository.read({ invitationUuid }, t)
    return UserRepository.read({ user: { id: userRole.userId } }, t)
  })
}
