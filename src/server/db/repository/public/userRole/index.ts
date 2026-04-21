import { create } from 'server/db/repository/public/userRole/create'
import { remove } from 'server/db/repository/public/userRole/remove'
import { update } from 'server/db/repository/public/userRole/update'
import { updateProps } from 'server/db/repository/public/userRole/updateProps'
import { updateRoles } from 'server/db/repository/public/userRole/updateRoles'

export const UserRoleRepository = {
  create,
  remove,
  update,
  updateProps,
  updateRoles,
}
