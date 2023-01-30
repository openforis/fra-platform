import { Objects } from '@utils/objects'

import { CollaboratorPermissions, CollaboratorSectionsPermission, RoleName, UserRole } from '@meta/user'

import { BaseProtocol, DB } from '@server/db'

export const updateSectionAuth = async (
  props: {
    id: string
    sections: CollaboratorSectionsPermission
  },
  client: BaseProtocol = DB
): Promise<UserRole<RoleName>> => {
  const { id, sections } = props

  return client
    .one<UserRole<RoleName>>(
      `
        update users_role
        set permissions = permissions || jsonb_build_object('sections', $1::jsonb)
        where id = $2
        returning *;
    `,
      [JSON.stringify(sections), id]
    )
    .then((data) => ({
      ...Objects.camelize(data),
      permissions: {
        ...Objects.camelize(data.permissions),
        sections: (data.permissions as CollaboratorPermissions).sections,
      },
    }))
}
