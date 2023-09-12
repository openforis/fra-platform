import { Objects } from 'utils/objects'

import { CollaboratorPermissions, RoleName, UserRole } from 'meta/user'

export const UserRoleAdapter = <N extends RoleName>({ permissions, ...role }: any): UserRole<N> => ({
  ...Objects.camelize(role),
  permissions: {
    ...Objects.camelize(permissions),
    sections: (permissions as CollaboratorPermissions).sections,
  },
})
