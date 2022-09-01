import { create } from './create'
import { getLastByUser } from './getLastByUser'
import { read } from './read'
import { update } from './update'

export const UserResetPasswordRepository = {
  create,
  read,
  update,
  getLastByUser,
}
