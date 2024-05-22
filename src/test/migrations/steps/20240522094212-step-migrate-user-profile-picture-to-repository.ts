import { Objects } from 'utils/objects'

import { User } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'

type DeprecatedUser = User & {
  profilePictureFile: Buffer
  profilePictureFilename: string
}

const client: BaseProtocol = DB

// a. Get users that have a profile picture
const _getUsersToUpdate = (): Promise<Array<DeprecatedUser>> => {
  return client.map(`select * from users where profile_picture_filename is not null`, [], (row) => {
    const { profile_picture_file: profilePictureFile, ...rest } = row
    return {
      profilePictureFile,
      ...Objects.camelize(rest),
    }
  })
}

// b. For each user, create a new file and update the user with the new file UUID
const _fixUser = async (user: DeprecatedUser) => {
  const { profilePictureFile, profilePictureFilename } = user

  const { uuid: fileUuid } = await client.one(`insert into file (name, file) values ($1, $2) returning uuid`, [
    profilePictureFilename,
    profilePictureFile,
  ])

  await client.query(`update users set profile_picture_file_uuid = $1 where id = $2`, [fileUuid, user.id])
}

export default async () => {
  // 1. Create a new column to store the file UUID
  await client.query(`
      alter table public.users
          add profile_picture_file_uuid uuid;

      alter table public.users
          add constraint users_file_uuid_fk
              foreign key (profile_picture_file_uuid) references public.file (uuid);
  `)

  // 2. Migrate the data
  const usersToUpdate = await _getUsersToUpdate()
  await Promise.all(usersToUpdate.map(_fixUser))

  // 3. Drop the old columns
  await client.query(`
    alter table users drop column profile_picture_filename;
    alter table users drop column profile_picture_file;
  `)
}
