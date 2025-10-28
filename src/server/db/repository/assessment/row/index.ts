import { cloneMany } from 'server/db/repository/assessment/row/cloneMany'
import { create } from 'server/db/repository/assessment/row/create'
import { getManyCache } from 'server/db/repository/assessment/row/getManyCache'
import { getOne } from 'server/db/repository/assessment/row/getOne'
import { getVariablesCache } from 'server/db/repository/assessment/row/getVariablesCache'

export const RowRepository = {
  cloneMany,
  create,
  getManyCache,
  getOne,
  getVariablesCache,
}
