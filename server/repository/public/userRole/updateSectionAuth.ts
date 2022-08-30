import { Objects } from '@utils/objects'

import { CollaboratorProps, RoleName, UserRole } from '@meta/user'

import { BaseProtocol, DB } from '@server/db'

export const updateSectionAuth = async (
  props: { id: string; sections: Record<string, boolean> },
  client: BaseProtocol = DB
): Promise<UserRole<RoleName, CollaboratorProps>> => {
  const { id, sections } = props

  return client.one<UserRole<RoleName, CollaboratorProps>>(
    `
        update users_role
        set props = props || jsonb_build_object('sections', $1::jsonb)
        where id = $2
        returning *;
    `,
    [JSON.stringify(sections), id],
    Objects.camelize
  )
}
