import { Objects } from 'utils/objects'

import { UserInvitation } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'

export const renew = async (
  props: { invitation: UserInvitation },
  client: BaseProtocol = DB
): Promise<UserInvitation> => {
  const {
    invitation: { uuid },
  } = props

  return client.one<UserInvitation>(
    'update users_invitation set invited_at = now() where uuid = $1 returning *;',
    [uuid],
    Objects.camelize
  )
}
