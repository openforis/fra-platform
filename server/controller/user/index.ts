import { UserRepository } from '@server/repository/public/user'
import { UserRoleRepository } from '@server/repository/public/userRole'

import { acceptInvitation } from './acceptInvitation'
import { changePassword } from './changePassword'
import { create } from './create'
import { createResetPassword } from './createResetPassword'
import { invite } from './invite'
import { readByInvitation } from './readByInvitation'
import { remove } from './remove'
import { sendInvitationEmail } from './sendInvitationEmail'
import { update } from './update'

export const UserController = {
  create,
  update,
  getMany: UserRepository.getMany,
  getOne: UserRepository.getOne,
  getProfilePicture: UserRepository.getProfilePicture,
  remove,
  invite,
  acceptInvitation,
  readByInvitation,
  removeInvitation: UserRoleRepository.remove,
  sendInvitationEmail,
  createResetPassword,
  changePassword,
  updateTableAccess: UserRoleRepository.updateSectionsProp,
}
