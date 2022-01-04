import { BaseProtocol, DB } from '@server/db'
import { UserRole, RoleName } from '@meta/user'
import { Objects } from '@core/utils'

export const acceptInvitation = async (
  props: {
    userRole: UserRole<RoleName, any>
  },
  client: BaseProtocol = DB
): Promise<UserRole<RoleName, any>> => {
  const {
    userRole: { id },
  } = props

  return client.one<UserRole<RoleName, any>>(
    `
        update users_role set
            accepted_at = now()
        where id = $1
        returning *
    `,
    [id],
    Objects.camelize
  )
}
