import { Objects } from '@core/utils'
import { RoleName, UserRole } from '@meta/user'
import { BaseProtocol, DB } from '@server/db'

export const read = async (
  props: { invitationUuid: string },
  client: BaseProtocol = DB
): Promise<UserRole<RoleName>> => {
  const { invitationUuid } = props

  return client.oneOrNone<UserRole<RoleName>>(
    `
        select * from users_role where invitation_uuid = $1
    `,
    [invitationUuid],
    Objects.camelize
  )
}
