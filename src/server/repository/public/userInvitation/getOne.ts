import { Objects } from 'utils/objects'

import { UserInvitation } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'

export const getOne = async (props: { invitationUuid: string }, client: BaseProtocol = DB): Promise<UserInvitation> => {
  const { invitationUuid } = props

  return client.oneOrNone<UserInvitation>(
    `
        select * from users_invitation where uuid = $1
    `,
    [invitationUuid],
    Objects.camelize
  )
}
