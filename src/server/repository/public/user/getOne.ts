import { Objects } from '@utils/objects'

import { CollaboratorProps, User } from '@meta/user'

import { BaseProtocol, DB } from '@server/db'

import { fields } from './fields'

const selectFields = fields.map((f) => `u.${f}`).join(',')

export const getOne = async (
  props: ({ id: number } | { email: string } | { emailGoogle: string }) & { cycleUuid?: string },
  client: BaseProtocol = DB
): Promise<User> => {
  const where = []
  const values = []

  if ('id' in props) {
    where.push('u.id = $1')
    values.push(String(props.id))
  } else if ('email' in props) {
    where.push('lower(trim(u.email)) = trim(lower($1))')
    values.push(props.email)
  } else if ('emailGoogle' in props) {
    where.push(
      `u.id = (
      select user_id from public.users_auth_provider
      where
      regexp_replace(props->>'email', '(?<!@gmail)\\.', '', 'g') = regexp_replace($1, '(?<!@gmail)\\.', '', 'g'))`
    )
    values.push(props.emailGoogle)
  } else {
    throw new Error('Missing parameter')
  }

  if (props.cycleUuid) {
    where.push('and ur.cycle_uuid = $2')
    values.push(props.cycleUuid)
  }

  return client
    .oneOrNone<User>(
      `
        select ${selectFields}, jsonb_agg(to_jsonb(ur.*)) as roles
        from public.users u
        left join users_role ur on u.id = ur.user_id and (ur.accepted_at is not null or ur.role = 'ADMINISTRATOR')
        where ${where.join(' ')}
        group by ${selectFields}
    `,
      values
    )
    .then((data) => {
      if (!data) return null
      return {
        ...Objects.camelize(data),
        roles:
          data.roles[0] !== null
            ? data.roles.map(({ props, ...role }) => ({
                ...Objects.camelize(role),
                props: { ...Objects.camelize(props), sections: (props as CollaboratorProps).sections },
              }))
            : data.roles,
      }
    })
}
