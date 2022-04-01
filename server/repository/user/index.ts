import { create } from './create'
import { update } from './update'
import { getOne } from './getOne'
import { getProfilePicture } from './getProfilePicture'
import { remove } from './remove'
import { readCountryUsersByRole } from './readCountryUsersByRole'

export const UserRepository = {
  create,
  update,
  getOne,
  getProfilePicture,
  remove,
  readCountryUsersByRole,
}
