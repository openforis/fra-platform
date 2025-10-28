import { User, UsersEmail } from 'meta/user'

import { BaseProtocol, DB } from 'server/db/db'
import { UserRepository } from 'server/db/repository/public/user'
import { UserInvitationRepository } from 'server/db/repository/public/userInvitation'

import { acceptInvitation } from './acceptInvitation'
import { changePassword } from './changePassword'
import { create } from './create'
import { createResetPassword } from './createResetPassword'
import { findByInvitation } from './findByInvitation'
import { findByResetPassword } from './findByResetPassword'
import { getManyExport } from './getManyExport'
import { getProfilePicture } from './getProfilePicture'
import { invite } from './invite'
import { mergeUsers } from './mergeUsers'
import { remove } from './remove'
import { removeInvitation } from './removeInvitation'
import { sendInvitationEmail } from './sendInvitationEmail'
import { update } from './update'

const getUserRobot = async (client: BaseProtocol = DB): Promise<User> => {
  return UserRepository.getOne({ allowDisabled: true, email: UsersEmail.robot }, client)
}

export const UserController = {
  create,
  count: UserRepository.count,
  update,
  getAdmins: UserRepository.getAdmins,
  getMany: UserRepository.getMany,
  getManyExport,
  getManyInvitations: UserInvitationRepository.getMany,
  getCountInvitations: UserInvitationRepository.getCount,
  getOne: UserRepository.getOne,
  getProfilePicture,
  getUserRobot,
  remove,
  invite,
  acceptInvitation,
  findByInvitation,
  findByResetPassword,
  removeInvitation,
  sendInvitationEmail,
  createResetPassword,
  changePassword,
  mergeUsers,
}
