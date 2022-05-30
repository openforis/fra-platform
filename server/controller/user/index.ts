import { UserRepository } from '@server/repository/public/user'

import { acceptInvitation } from './acceptInvitation'
import { changePassword } from './changePassword'
import { create } from './create'
import { createResetPassword } from './createResetPassword'
import { invite } from './invite'
import { readByInvitation } from './readByInvitation'
import { remove } from './remove'
import { update } from './update'

export const UserController = {
  create,
  update,
  getOne: UserRepository.getOne,
  getProfilePicture: UserRepository.getProfilePicture,
  remove,
  invite,
  acceptInvitation,
  readByInvitation,
  createResetPassword,
  changePassword,
  readCountryUsersByRole: UserRepository.readCountryUsersByRole,
}
