import { getCount } from './getCount'
import { buildGetManyQuery, getMany } from './getMany'
import { markDeletedMany } from './markDeletedMany'
import { update } from './update'
import { upsertMany } from './upsertMany'

export const LinkRepository = {
  buildGetManyQuery,
  getCount,
  getMany,
  markDeletedMany,
  update,
  upsertMany,
}
