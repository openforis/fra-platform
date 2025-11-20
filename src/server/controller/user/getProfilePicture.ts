import { UserProfilePicture } from 'meta/user/profilePicture'

import { BaseProtocol, DB } from 'server/db/db'
import { UserRepository } from 'server/db/repository/public/user'
import { FileStorage } from 'server/service/fileStorage'

type Props = {
  userId: number
}

export const getProfilePicture = async (props: Props, client: BaseProtocol = DB): Promise<UserProfilePicture> => {
  const { userId } = props
  const userProfilePicture = await UserRepository.getProfilePicture({ userId }, client)
  const key = userProfilePicture?.uuid
  if (!key) return null
  const data = await FileStorage.File.get({ key })
  return {
    ...userProfilePicture,
    data,
  }
}
