import { BaseProtocol, DB } from '@server/db'
import { UserRole, RoleName } from '@core/meta/user'
import { Objects } from '@core/utils'

export const update = async (
  props: {
    userRole: UserRole<RoleName, any>
    accept?: boolean
  },
  client: BaseProtocol = DB
): Promise<UserRole<RoleName, any>> => {
  const {
    userRole: { id, invitationUuid, acceptedAt },
    accept = false,
  } = props

  const _acceptedAt = accept ? `now()` : acceptedAt

  return client.one<UserRole<RoleName, any>>(
    `
        update users_role set
            invitation_uuid = $2,
            accepted_at = $3
        where id = $1
        returning *
    `,
    [id, invitationUuid, _acceptedAt],
    Objects.camelize
  )
}
