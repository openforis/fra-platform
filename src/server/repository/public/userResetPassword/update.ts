import { Objects } from 'utils/objects'

import { UserResetPassword } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'

export const update = async (
  props: {
    uuid: string
    active?: boolean
  },
  client: BaseProtocol = DB
): Promise<UserResetPassword> => {
  const { uuid, active = false } = props

  return client.oneOrNone<UserResetPassword>(
    `
      update public.users_reset_password
      set changed_at = now(), active = $2
      where uuid = $1
      returning *;
    `,
    [uuid, active],
    Objects.camelize
  )
}
