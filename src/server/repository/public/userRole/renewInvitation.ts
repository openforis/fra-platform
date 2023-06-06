import { Objects } from 'utils/objects'

import { RoleName, UserRole } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'

export const renewInvitation = async (props: { userRole: UserRole<RoleName> }, client: BaseProtocol = DB): Promise<UserRole<RoleName>> => {
  const {
    userRole: { id },
  } = props

  return client.one<UserRole<RoleName>>('update users_role set invited_at = now() where id = $1 returning *;', [id], Objects.camelize)
}
