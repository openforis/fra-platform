import { User } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'
import { FileRepository } from 'server/repository/public/file'

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
    const createdFile = await FileRepository.create({ file: profilePicture }, client)

    await client.query(
      `
        update users set
                     profile_picture_file_uuid = $1
        where id = $2
    `,
      [createdFile.uuid, id]
    )
  }

  return getOne({ email, allowDisabled: true }, client)
}
