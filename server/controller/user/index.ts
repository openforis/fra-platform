import { create } from './create'
import { update } from './update'
import { read } from './read'
import { remove } from './remove'
import { invite } from './invite'
import { acceptInvitation } from './acceptInvitation'
import { readByInvitation } from './readByInvitation'
import { createResetPassword } from './createResetPassword'
import { changePassword } from './changePassword'

export const UserController = {
  create,
  update,
  read,
  remove,
  invite,
  acceptInvitation,
  readByInvitation,
  createResetPassword,
  changePassword,
}
