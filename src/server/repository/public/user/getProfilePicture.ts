import { UserProfilePicture } from 'meta/user/userProfilePicture'

import { BaseProtocol, DB } from 'server/db'

export const getProfilePicture = async (
  props: { id: number } | { email: string } | { emailGoogle: string },
  client: BaseProtocol = DB
): Promise<UserProfilePicture | undefined> => {
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

  return client.oneOrNone<UserProfilePicture | undefined>(
    `
        select f.uuid, f.name
        from public.users u
            left join file f on u.profile_picture_file_uuid = f.uuid
        ${where}
    `,
    [value]
  )
}
