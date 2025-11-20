import { UserProfilePicture } from 'meta/user/profilePicture'

import { BaseProtocol, DB } from 'server/db/db'

type ProfilePicture = { userId: number }
type Returned = UserProfilePicture | undefined

export const getProfilePicture = async (props: ProfilePicture, client: BaseProtocol = DB): Promise<Returned> => {
  return client.oneOrNone<UserProfilePicture | undefined>(
    `
        select f.uuid, f.name
        from public.users u
            join file f on u.profile_picture_file_uuid = f.uuid
        where u.id = $1
    `,
    [props.userId]
  )
}
