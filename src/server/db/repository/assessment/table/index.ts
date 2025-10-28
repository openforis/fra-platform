import { cloneMany } from 'server/db/repository/assessment/table/cloneMany'
import { create } from 'server/db/repository/assessment/table/create'
import { getMany } from 'server/db/repository/assessment/table/getMany'
import { getOne } from 'server/db/repository/assessment/table/getOne'
import { remove } from 'server/db/repository/assessment/table/remove'
import { update } from 'server/db/repository/assessment/table/update'

export const TableRepository = {
  cloneMany,
  create,
  getMany,
  getOne,
  remove,
  update,
}
