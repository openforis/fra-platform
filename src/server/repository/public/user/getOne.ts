import { Objects } from '@utils/objects'

import { CollaboratorProps, User } from '@meta/user'

import { BaseProtocol, DB } from '@server/db'

const fields: Array<string> = ['lang', 'id', 'name', 'status', 'position', 'email']

const selectFields = fields.map((f) => `u.${f}`).join(',')

export const getOne = async (
  props: { id: number } | { email: string } | { emailGoogle: string },
  client: BaseProtocol = DB
): Promise<User | undefined> => {
  let where = ''
  let value = ''

  if ('id' in props) {
    where = 'where u.id = $1'
    value = String(props.id)
  } else if ('email' in props) {
    where = 'where lower(trim(u.email)) = trim(lower($1))'
    value = props.email
  } else if ('emailGoogle' in props) {
    where = `where u.id = (select user_id from public.users_auth_provider where props->>'email' = $1)`
    value = props.emailGoogle
  } else {
    throw new Error('Missing parameter')
  }

  return client
    .oneOrNone<User | undefined>(
      `
        select ${selectFields}, jsonb_agg(to_jsonb(ur.*)) as roles
        from public.users u
        left join users_role ur on u.id = ur.user_id
        ${where}
        group by ${selectFields}
    `,
      [value]
    )
    .then((data) =>
      data
        ? {
            ...Objects.camelize(data),
            roles:
              data.roles && data.roles[0] !== null
                ? data.roles.map(({ props, ...role }) => ({
                    ...Objects.camelize(role),
                    props: { ...Objects.camelize(props), sections: (props as CollaboratorProps).sections },
                  }))
                : data.roles,
          }
        : data
    )
}
