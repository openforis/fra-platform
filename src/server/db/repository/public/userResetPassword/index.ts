import { create } from 'server/db/repository/public/userResetPassword/create'
import { getLastByUser } from 'server/db/repository/public/userResetPassword/getLastByUser'
import { read } from 'server/db/repository/public/userResetPassword/read'
import { update } from 'server/db/repository/public/userResetPassword/update'

export const UserResetPasswordRepository = {
  create,
  read,
  update,
  getLastByUser,
}
