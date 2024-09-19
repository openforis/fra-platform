import { cloneMany } from 'server/repository/assessment/row/cloneMany'
import { create } from 'server/repository/assessment/row/create'
import { getManyCache } from 'server/repository/assessment/row/getManyCache'
import { getOne } from 'server/repository/assessment/row/getOne'
import { getVariablesCache } from 'server/repository/assessment/row/getVariablesCache'

export const RowRepository = {
  cloneMany,
  create,
  getManyCache,
  getOne,
  getVariablesCache,
}
