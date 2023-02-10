import { acceptInvitation } from './acceptInvitation'
import { create } from './create'
import { read } from './read'
import { remove } from './remove'
import { renewInvitation } from './renewInvitation'
import { update } from './update'
import { updateProps } from './updateProps'
import { updateSectionAuth } from './updateSectionAuth'

export const UserRoleRepository = {
  acceptInvitation,
  create,
  read,
  renewInvitation,
  remove,
  update,
  updateProps,
  updateSectionAuth,
}
