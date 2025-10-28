import { cloneMany } from 'server/db/repository/assessment/tableSection/cloneMany'
import { create } from 'server/db/repository/assessment/tableSection/create'
import { getOne } from 'server/db/repository/assessment/tableSection/getOne'
import { remove } from 'server/db/repository/assessment/tableSection/remove'
import { update } from 'server/db/repository/assessment/tableSection/update'

export const TableSectionRepository = {
  cloneMany,
  create,
  getOne,
  remove,
  update,
}
