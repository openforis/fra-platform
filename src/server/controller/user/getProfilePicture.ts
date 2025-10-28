import { UserProfilePicture } from 'meta/user/userProfilePicture'

import { BaseProtocol, DB } from 'server/db/db'
import { UserRepository } from 'server/repository/public/user'
import { FileStorage } from 'server/service/fileStorage'

export const getProfilePicture = async (
  props: {
    id: number
  },
  client: BaseProtocol = DB
): Promise<UserProfilePicture> => {
  const { id } = props
  const userProfilePicture = await UserRepository.getProfilePicture({ id }, client)
  const key = userProfilePicture?.uuid
  if (!key) return null
  const data = await FileStorage.File.get({ key })
  return {
    ...userProfilePicture,
    data,
  }
}
