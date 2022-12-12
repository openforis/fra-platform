import { UserRepository } from '@server/repository/public/user'
import { UserRoleRepository } from '@server/repository/public/userRole'

import { acceptInvitation } from './acceptInvitation'
import { changePassword } from './changePassword'
import { create } from './create'
import { createResetPassword } from './createResetPassword'
import { invite } from './invite'
import { readByInvitation } from './readByInvitation'
import { readByResetPassword } from './readByResetPassword'
import { remove } from './remove'
import { removeInvitation } from './removeInvitation'
import { sendInvitationEmail } from './sendInvitationEmail'
import { update } from './update'
import { updateUserRoles } from './updateUserRoles'

export const UserController = {
  create,
  count: UserRepository.count,
  update,
  getMany: UserRepository.getMany,
  getOne: UserRepository.getOne,
  getProfilePicture: UserRepository.getProfilePicture,
  remove,
  invite,
  acceptInvitation,
  readByInvitation,
  readByResetPassword,
  removeInvitation,
  sendInvitationEmail,
  createResetPassword,
  changePassword,
  updateSectionAuth: UserRoleRepository.updateSectionAuth,
  updateUserRoles,
}
