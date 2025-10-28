import { cloneMany } from 'server/db/repository/assessment/col/cloneMany'
import { create } from 'server/db/repository/assessment/col/create'
import { getMany } from 'server/db/repository/assessment/col/getMany'
import { update } from 'server/db/repository/assessment/col/update'

export const ColRepository = {
  cloneMany,
  create,
  getMany,
  update,
}
