import { Objects } from '@utils/objects'

import { UserResetPassword } from '@meta/user'

import { BaseProtocol, DB } from '@server/db'

export const read = async (
  props: {
    uuid: string
  },
  client: BaseProtocol = DB
): Promise<UserResetPassword | null> => {
  const { uuid } = props

  return client.oneOrNone<UserResetPassword>(
    `
      select * from public.users_reset_password where uuid = $1;
    `,
    [uuid],
    Objects.camelize
  )
}
