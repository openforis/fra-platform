import { create } from 'server/db/repository/public/file/create'
import { getMany } from 'server/db/repository/public/file/getMany'
import { getOne } from 'server/db/repository/public/file/getOne'
import { getSummary } from 'server/db/repository/public/file/getSummary'
import { getUnusedUUIDs } from 'server/db/repository/public/file/getUnusedUUIDs'
import { remove } from 'server/db/repository/public/file/remove'
import { removeMany } from 'server/db/repository/public/file/removeMany'

export const FileRepository = {
  create,
  getMany,
  getOne,
  getSummary,
  getUnusedUUIDs,
  remove,
  removeMany,
}
