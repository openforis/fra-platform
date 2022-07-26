import { User } from '@meta/user'

import { BaseProtocol, DB } from '@server/db'

export const updateProfilePicture = async (
  props: { user: User; file: Express.Multer.File },
  client: BaseProtocol = DB
): Promise<void> => {
  const {
    file: { filename, buffer },
    user: { id },
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
