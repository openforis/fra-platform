import { Objects } from 'utils/objects'

import { UserInvitation } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'

type Props = {
  userInvitation: UserInvitation
}

export const accept = async (props: Props, client: BaseProtocol = DB): Promise<UserInvitation> => {
  const { userInvitation } = props
  return client.one(
    `
    update public.users_invitation
    set accepted_at = now()
    where uuid = $1
    returning *
    `,
    [userInvitation.uuid],
    (row) => Objects.camelize(row)
  )
}
