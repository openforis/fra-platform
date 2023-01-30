import { Objects } from '@utils/objects'

import { Collaborator, CollaboratorPermissions, CollaboratorSectionsPermission } from '@meta/user'

import { BaseProtocol, DB } from '@server/db'

export const updateSectionAuth = async (
  props: {
    id: string
    sections: CollaboratorSectionsPermission
  },
  client: BaseProtocol = DB
): Promise<Collaborator> => {
  const { id, sections } = props

  return client
    .one<Collaborator>(
      `
        update users_role
        set props = props || jsonb_build_object('sections', $1::jsonb)
        where id = $2
        returning *;
    `,
      [JSON.stringify(sections), id]
    )
    .then((data) => ({
      ...Objects.camelize(data),
      props: { ...Objects.camelize(props), sections: (props as CollaboratorPermissions).sections },
    }))
}
