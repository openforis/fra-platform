import { BaseProtocol, DB } from '@server/db'
import { User } from '@meta/user'
import { UserRepository } from '.'

export const readByInvitation = async (props: { invitationUuid: string }, client: BaseProtocol = DB): Promise<User> => {
  const { invitationUuid } = props

  const userId = await client.oneOrNone<number>(
    `
        select user_id from users_role where invitation_uuid = $1
    `,
    [invitationUuid]
  )
  return UserRepository.read({ user: { id: userId } })
}
