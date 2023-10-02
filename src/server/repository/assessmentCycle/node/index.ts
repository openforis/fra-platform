import { create } from './create'
import { deleteMany } from './deleteMany'
import { getOneOrNone } from './getOneOrNone'
import { massiveInsert } from './massiveInsert'
import { remove } from './remove'
import { update } from './update'
import { updateValidation } from './updateValidation'

export const NodeRepository = {
  create,
  deleteMany,
  getOneOrNone,
  massiveInsert,
  remove,
  update,
  updateValidation,
}

export type { NodeDb } from './nodeDb'
