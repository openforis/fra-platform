import { create } from './create'
import { update } from './update'
import { getOne } from './getOne'
import { remove } from './remove'
import { readCountryUsersByRole } from './readCountryUsersByRole'

export const UserRepository = {
  create,
  update,
  getOne,
  remove,
  readCountryUsersByRole,
}
