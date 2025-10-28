import { create } from 'server/db/repository/assessmentCycle/node/create'
import { deleteMany } from 'server/db/repository/assessmentCycle/node/deleteMany'
import { getOneOrNone } from 'server/db/repository/assessmentCycle/node/getOneOrNone'
import { massiveInsert } from 'server/db/repository/assessmentCycle/node/massiveInsert'
import { remove } from 'server/db/repository/assessmentCycle/node/remove'
import { update } from 'server/db/repository/assessmentCycle/node/update'
import { updateValidation } from 'server/db/repository/assessmentCycle/node/updateValidation'

export const NodeRepository = {
  create,
  deleteMany,
  getOneOrNone,
  massiveInsert,
  remove,
  update,
  updateValidation,
}

export type { NodeDb } from 'server/db/repository/assessmentCycle/node/nodeDb'
