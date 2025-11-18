import { Objects } from 'utils/objects'

import { UserResetPassword } from 'meta/user/resetPassword'

import { BaseProtocol, DB } from 'server/db/db'

export const update = async (
  props: {
    uuid: string
    active?: boolean
  },
  client: BaseProtocol = DB
): Promise<UserResetPassword> => {
  const { active = false, uuid } = props

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
