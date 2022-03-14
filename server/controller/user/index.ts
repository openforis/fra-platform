import { create } from './create'
import { update } from './update'
import { getOne } from './getOne'
import { remove } from './remove'
import { invite } from './invite'
import { acceptInvitation } from './acceptInvitation'
import { readByInvitation } from './readByInvitation'
import { createResetPassword } from './createResetPassword'
import { changePassword } from './changePassword'

export const UserController = {
  create,
  update,
  getOne,
  remove,
  invite,
  acceptInvitation,
  readByInvitation,
  createResetPassword,
  changePassword,
}
