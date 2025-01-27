import { Promises } from 'utils/promises'

import { Files } from 'meta/file'

import { BaseProtocol } from 'server/db'
import { FileStorage } from 'server/service/fileStorage'
import { Logger } from 'server/utils/logger'

interface LegacyUser {
  profile_picture_filename: string
  profile_picture_file: Buffer
  uuid: string
  email: string
  id: number
}

export default async (client: BaseProtocol) => {
  const usersToUpdate = await client.many<LegacyUser>(`
    select 
      lu.profile_picture_filename, 
      lu.profile_picture_file, 
      lu.email,
      pu.uuid,
      pu.id
    from _legacy.fra_user lu
    left join public.users pu using (email)
    where
      pu.uuid is not null
      and lu.profile_picture_file is not null 
      and pu.profile_picture_file_uuid is null
  `)

  await Promises.each(usersToUpdate, async (user) => {
    const fileSizeKB = Files.humanReadableSize(user.profile_picture_file.length)
    Logger.info(`Processing avatar for ${user.email} (${fileSizeKB}KB)`)
    const { uuid } = await client.one<{ uuid: string }>(
      `
      insert into public.file (name)
      values ($1)
      returning uuid
    `,
      [user.profile_picture_filename]
    )

    await client.query(
      `
      update public.users
      set profile_picture_file_uuid = $1
      where uuid = $2
    `,
      [uuid, user.uuid]
    )

    await FileStorage.uploadFile({
      key: uuid,
      body: user.profile_picture_file,
    })
  })
}
