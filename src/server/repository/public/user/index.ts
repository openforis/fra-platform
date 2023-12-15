import { count } from './count'
import { create } from './create'
import { getContacts } from './getContacts'
import { getMany } from './getMany'
import { getOne } from './getOne'
import { getProfilePicture } from './getProfilePicture'
import { readCountryUsersByRole } from './readCountryUsersByRole'
import { remove } from './remove'
import { update } from './update'

export const UserRepository = {
  count,
  create,
  update,
  getContacts,
  getMany,
  getOne,
  getProfilePicture,
  remove,
  readCountryUsersByRole,
}
