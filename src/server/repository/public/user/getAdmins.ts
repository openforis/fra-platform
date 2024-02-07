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
  return client.map<User>(
    `
      select ${selectFields}, jsonb_agg(to_jsonb(ur.*) - 'props') as roles
      from public.users u
              join public.users_role ur on (u.id = ur.user_id)
      where ur.role = '${RoleName.ADMINISTRATOR}'
        and u.status in ($1:list)
      group by ${selectFields}
    `,
    [statuses],
    (row) => {
      const { roles, ...user } = row
      return {
        ...Objects.camelize(user),
        roles: roles.map(UserRoleAdapter),
      }
    }
  )
}
