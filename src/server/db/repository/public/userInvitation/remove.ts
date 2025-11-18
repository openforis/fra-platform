import { Objects } from 'utils/objects'

import { UserInvitation } from 'meta/user/invitation'

import { BaseProtocol, DB } from 'server/db/db'

type Props = {
  invitationUuid: UserInvitation['uuid']
}

export const remove = async (props: Props, client: BaseProtocol = DB): Promise<UserInvitation> => {
  const { invitationUuid } = props

  return client.one<UserInvitation>(
    `
        delete
        from public.users_invitation
        where uuid = $1
        returning *;
`,
    [invitationUuid],
    (row) => Objects.camelize(row)
  )
}
