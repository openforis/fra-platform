import { User } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'

import { getOne } from './getOne'

export const update = async (props: { user: User }, client: BaseProtocol = DB): Promise<User> => {
  const {
    user: { id, email, props: userProperties, status, profilePictureFileUuid },
  } = props

  await client.one<User>(
    `
        update users set
                      email = $1,
                      props = $2,
                      status = $3,
                      profile_picture_file_uuid = $4
        where id = $5
        returning *
    `,
    [email, userProperties, status, profilePictureFileUuid, id]
  )

  return getOne({ email, allowDisabled: true }, client)
}
