import { Objects } from 'utils/objects'

import { RoleName, User, UserStatus } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'
import { UserRoleAdapter } from 'server/repository/adapter'

import { fields } from './fields'

const selectFields = fields.map((f) => `u.${f}`).join(',')

export const getAdmins = async (
  props: { statuses?: Array<UserStatus> } = {},
  client: BaseProtocol = DB
): Promise<Array<User>> => {
  const { statuses = [UserStatus.active] } = props
  const statusWhereCondition = `u.status in (${statuses.map((status) => `'${status}'`).join(',')})`

  const query = `
      select ${selectFields}, jsonb_agg(to_jsonb(ur.*) - 'props') as roles
      from public.users u
               join public.users_role ur on (u.id = ur.user_id)
      where ur.role = '${RoleName.ADMINISTRATOR}'
        and ${statusWhereCondition}
      group by ${selectFields}
  `

  return client.manyOrNone<User>(query).then((data) =>
    data.map(({ roles, ...user }) => ({
      ...Objects.camelize(user),
      roles: roles.map(UserRoleAdapter),
    }))
  )
}
