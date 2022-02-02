import { create } from './create'
import { update } from './update'
import { read } from './read'
import { remove } from './remove'
import { readCountryUsersByRole } from './readCountryUsersByRole'

export const UserRepository = {
  create,
  update,
  read,
  remove,
  readCountryUsersByRole,
}
