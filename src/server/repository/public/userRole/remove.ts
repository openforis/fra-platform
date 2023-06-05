import { Objects } from 'utils/objects'

import { RoleName, UserRole } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'

export const remove = async (
  props: { invitationUuid: string },
  client: BaseProtocol = DB
): Promise<UserRole<RoleName>> => {
  const { invitationUuid } = props

  return client.oneOrNone<UserRole<RoleName>>(
    'delete from public.users_role where invitation_uuid = $1 returning *;',
    [invitationUuid],
    Objects.camelize
  )
}
