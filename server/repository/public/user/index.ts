import { create } from './create'
import { getOne } from './getOne'
import { getProfilePicture } from './getProfilePicture'
import { readCountryUsersByRole } from './readCountryUsersByRole'
import { remove } from './remove'
import { update } from './update'

export const UserRepository = {
  create,
  update,
  getOne,
  getProfilePicture,
  remove,
  readCountryUsersByRole,
}
