import { BaseProtocol, DB } from '@server/db'
import { User } from '@core/meta/user/user'
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

// TODO: handle selection by id
export const read = async (props: { user: Pick<User, 'email'> }, client: BaseProtocol = DB): Promise<User> => {
  const {
    user: { email },
  } = props

  return client.one<User>(
    `
        select ${selectFields}, jsonb_agg(to_jsonb(ur.*) - 'id') as roles
        from public.users u
                 left join users_role ur on u.id = ur.user_id
        where lower(trim(u.email)) = trim(lower($1))
        group by ${selectFields}
    `,
    [email],
    Objects.camelize
  )
}
