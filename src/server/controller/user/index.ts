import { UserRepository } from 'server/repository/public/user'
import { UserInvitationRepository } from 'server/repository/public/userInvitation'
import { UserRoleRepository } from 'server/repository/public/userRole'

import { acceptInvitation } from './acceptInvitation'
import { changePassword } from './changePassword'
import { create } from './create'
import { createResetPassword } from './createResetPassword'
import { findByInvitation } from './findByInvitation'
import { findByResetPassword } from './findByResetPassword'
import { invite } from './invite'
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
  getManyInvitations: UserInvitationRepository.getMany,
  getCountInvitations: UserInvitationRepository.getCount,
  getOne: UserRepository.getOne,
  getProfilePicture: UserRepository.getProfilePicture,
  remove,
  invite,
  acceptInvitation,
  findByInvitation,
  findByResetPassword,
  removeInvitation,
  sendInvitationEmail,
  createResetPassword,
  changePassword,
  updateRoleProps: UserRoleRepository.updateProps,
  updateSectionAuth: UserRoleRepository.updateSectionAuth,
  updateUserRoles,
}
