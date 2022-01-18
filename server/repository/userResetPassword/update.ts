import { BaseProtocol, DB } from '@server/db'
import { Objects } from '@core/utils'
import { UserResetPassword } from '@meta/user'

export const update = async (
  props: {
    uuid: string
  },
  client: BaseProtocol = DB
): Promise<UserResetPassword | null> => {
  const { uuid } = props

  return client.oneOrNone<UserResetPassword>(
    `
      update public.users_reset_password
      set changed_at = now()
      where uuid = $1
      returning *;
    `,
    [uuid],
    Objects.camelize
  )
}
