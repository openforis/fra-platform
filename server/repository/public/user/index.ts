import { create } from './create'
import { getMany } from './getMany'
import { getOne } from './getOne'
import { getProfilePicture } from './getProfilePicture'
import { readCountryUsersByRole } from './readCountryUsersByRole'
import { remove } from './remove'
import { update } from './update'
import { updateProfilePicture } from './updateProfilePicture'

export const UserRepository = {
  create,
  update,
  getMany,
  getOne,
  getProfilePicture,
  remove,
  readCountryUsersByRole,
  updateProfilePicture,
}
