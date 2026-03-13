import { count } from 'server/db/repository/public/user/count'
import { create } from 'server/db/repository/public/user/create'
import { getAdmins } from 'server/db/repository/public/user/getAdmins'
import { getContacts } from 'server/db/repository/public/user/getContacts'
import { buildGetManyExportQuery, buildGetManyQuery, getMany } from 'server/db/repository/public/user/getMany'
import { getOne } from 'server/db/repository/public/user/getOne'
import { getProfilePicture } from 'server/db/repository/public/user/getProfilePicture'
import { mergeUsers } from 'server/db/repository/public/user/mergeUsers'
import { readCountryUsersByRole } from 'server/db/repository/public/user/readCountryUsersByRole'
import { remove } from 'server/db/repository/public/user/remove'
import { update } from 'server/db/repository/public/user/update'
import { UsersGetManyProps } from 'server/db/repository/public/user/usersGetManyProps'

export const UserRepository = {
  buildGetManyExportQuery,
  buildGetManyQuery,
  count,
  create,
  getAdmins,
  getContacts,
  getMany,
  getOne,
  getProfilePicture,
  mergeUsers,
  readCountryUsersByRole,
  remove,
  update,
}

export type { UsersGetManyProps }
