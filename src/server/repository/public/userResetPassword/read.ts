import { Objects } from 'utils/objects'

import { UserResetPassword } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'

export const read = async (
  props: {
    uuid: string
    active?: boolean
  },
  client: BaseProtocol = DB
): Promise<UserResetPassword> => {
  const { uuid, active = true } = props

  return client.oneOrNone<UserResetPassword>(
    `
      select * from public.users_reset_password
      where uuid = $1 and active = $2;
    `,
    [uuid, active],
    Objects.camelize
  )
}
