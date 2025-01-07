import { UsersGetManyProps } from 'server/repository/public/user/usersGetManyProps'

import { count } from './count'
import { create } from './create'
import { getAdmins } from './getAdmins'
import { getContacts } from './getContacts'
import { buildGetManyQuery, getMany } from './getMany'
import { getOne } from './getOne'
import { getProfilePicture } from './getProfilePicture'
import { readCountryUsersByRole } from './readCountryUsersByRole'
import { remove } from './remove'
import { update } from './update'

export const UserRepository = {
  buildGetManyQuery,
  count,
  create,
  update,
  getAdmins,
  getContacts,
  getMany,
  getOne,
  getProfilePicture,
  remove,
  readCountryUsersByRole,
}

export type { UsersGetManyProps }
