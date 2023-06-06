import { User } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'

import { getOne } from './getOne'

export const update = async (
  props: { user: User; profilePicture?: Express.Multer.File | null },
  client: BaseProtocol = DB
): Promise<User> => {
  const {
    profilePicture,
    user: { id, email, props: userProperties, status },
  } = props

  await client.one<User>(
    `
        update users set
                      email = $1,
                      props = $2,
                      status = $3
        where id = $4
        returning *
    `,
    [email, userProperties, status, id]
  )

  if (profilePicture) {
    const {
      profilePicture: { originalname, buffer },
    } = props

    await client.query(
      `
        update users set
            profile_picture_filename = $1,
            profile_picture_file = $2
        where id = $3
    `,
      [originalname, buffer, id]
    )
  }

  return getOne({ email }, client)
}
