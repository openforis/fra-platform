import { RoleName } from 'meta/user/role/name'
import { User, UserStatus } from 'meta/user/user'

import { BaseProtocol, DB } from 'server/db/db'
import { UserAdapter } from 'server/db/repository/adapter/user'
import { fields } from 'server/db/repository/public/user/fields'

const selectFields = fields.map((f) => `u.${f}`).join(',')

type Props = {
  statuses?: Array<UserStatus>
}

export const getAdmins = async (props: Props = {}, client: BaseProtocol = DB): Promise<Array<User>> => {
  const { statuses = [UserStatus.active] } = props

  return client.map<User>(
    `
      select ${selectFields}, jsonb_agg(to_jsonb(ur.*) - 'props') as roles
      from public.users u
              join public.users_role ur on (u.uuid = ur.user_uuid)
      where ur.role = '${RoleName.ADMINISTRATOR}'
        and u.status in ($1:list)
      group by ${selectFields}
    `,
    [statuses],
    UserAdapter
  )
}
