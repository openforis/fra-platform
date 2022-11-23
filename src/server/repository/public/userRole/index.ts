import { acceptInvitation } from './acceptInvitation'
import { create } from './create'
import { read } from './read'
import { remove } from './remove'
import { renewInvitation } from './renewInvitation'
import { update } from './update'
import { updateSectionAuth } from './updateSectionAuth'

export const UserRoleRepository = {
  acceptInvitation,
  create,
  read,
  renewInvitation,
  remove,
  update,
  updateSectionAuth,
}
