import { User } from '@meta/user'

import { BaseProtocol, DB } from '@server/db'

import { getOne } from './getOne'

export const update = async (
  props: { user: User; profilePicture: Express.Multer.File | null },
  client: BaseProtocol = DB
): Promise<User> => {
  const {
    profilePicture,
    user: { institution, lang, name, status, position, email, id },
  } = props

  await client.one<User>(
    `
        update users set
                      institution = $1,
                      lang = $2,
                      name = $3,
                      status = $4,
                      position = $5,
                      email = $6
        where id = $7
        returning *
    `,
    [institution, lang, name, status, position, email, id]
  )

  if (profilePicture) {
    const {
      profilePicture: { filename, buffer },
    } = props

    await client.query(
      `
        update users set
            profile_picture_filename = $1,
            profile_picture_file = $2
        where id = $3
    `,
      [filename, buffer, id]
    )
  }

  return getOne({ email }, client)
}
