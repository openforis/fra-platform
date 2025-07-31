import { RoleName, UserRole } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'
import { UserRoleAdapter } from 'server/repository/adapter'

/**
 * @deprecated TODO: Is this file used?
 */
export const updateSectionAuth = async (
  props: {
    id: string
    sections: any // CollaboratorSectionsPermission
  },
  client: BaseProtocol = DB
): Promise<UserRole<RoleName>> => {
  const { id, sections } = props

  return client.one<UserRole<RoleName>>(
    `
        update users_role
        set permissions = permissions || jsonb_build_object('sections', $1::jsonb)
        where id = $2
        returning *;
    `,
    [JSON.stringify(sections), id],
    UserRoleAdapter
  )
}
