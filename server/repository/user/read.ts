import { BaseProtocol, DB } from '@server/db'
import { User } from '@meta/user'
import { Objects } from '@core/utils'

const fields: Array<string> = [
  'lang',
  'id',
  'profile_picture_filename',
  'name',
  'status',
  'profile_picture_file',
  'position',
  'email',
]

const selectFields = fields.map((f) => `u.${f}`).join(',')

export const read = async (
  props: { user: Pick<User, 'email'> } | { user: Pick<User, 'id'> },
  client: BaseProtocol = DB
): Promise<User> => {
  const { user } = props

  const value = 'email' in user ? user.email : +user.id
  const where = 'email' in user ? `where lower(trim(u.email)) = trim(lower($1))` : `where u.id = $1`

  return client.oneOrNone<User>(
    `
        select ${selectFields}, jsonb_agg(to_jsonb(ur.*)) as roles
        from public.users u
                 left join users_role ur on u.id = ur.user_id
        ${where}
        group by ${selectFields}
    `,
    [value],
    Objects.camelize
  )
}
