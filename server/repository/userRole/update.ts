import { BaseProtocol, DB } from '@server/db'
import { UserRole, RoleName } from '@meta/user'
import { Objects } from '@core/utils'

export const update = async (
  props: {
    userRole: UserRole<RoleName, any>
    accept?: boolean
  },
  client: BaseProtocol = DB
): Promise<UserRole<RoleName, any>> => {
  const {
    userRole: { id, acceptedAt },
    accept = false,
  } = props

  const _acceptedAt = accept ? `now()` : acceptedAt

  return client.one<UserRole<RoleName, any>>(
    `
        update users_role set
            accepted_at = $2
        where id = $1
        returning *
    `,
    [id, _acceptedAt],
    Objects.camelize
  )
}
