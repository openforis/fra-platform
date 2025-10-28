import { create } from 'server/db/repository/assessmentCycle/cycle/create'
import { remove } from 'server/db/repository/assessmentCycle/cycle/remove'
import { removeSchema } from 'server/db/repository/assessmentCycle/cycle/removeSchema'
import { rename } from 'server/db/repository/assessmentCycle/cycle/rename'
import { update } from 'server/db/repository/assessmentCycle/cycle/update'

export const CycleRepository = {
  create,
  remove,
  removeSchema,
  rename,
  update,
}
